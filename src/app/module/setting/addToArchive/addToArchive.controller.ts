import { Request, Response } from "express";
import AppError from "../../../utils/AppError";
import { Archive } from "./addToArchive.model";
import { Project } from "../../project/project.model";
import { sendResponse } from "../../../utils/sendResponse";

const addToArchive = async (req: Request, res: Response) => {
    try {
        const { taskId, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" });
        }

        if (Array.isArray(taskId)) {
            const data = taskId.map(id => ({ taskId: id, userId }));
            const result = await Archive.insertMany(data);


            await Project.updateMany(
                { "tasks._id": { $in: taskId } },
                { $set: { "tasks.$[].isArchived": true } }
            );

            return res.status(201).json({
                success: true,
                message: "Multiple tasks archived successfully",
                data: result
            });
        }

        const archive = await Archive.create({ taskId, userId });

        await Project.updateOne(
            { "tasks._id": taskId },
            { $set: { "tasks.$.isArchived": true } }
        );

        return res.status(201).json({
            success: true,
            message: "Task archived successfully",
            data: archive
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || "Archive not added"
        });
    }
};

const removeArchive = async (req: Request, res: Response) => {
    try {
        const { taskId, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" });
        }

        if (Array.isArray(taskId)) {

            const result = await Archive.deleteMany({
                taskId: { $in: taskId },
                userId
            });

            await Project.updateMany(
                { "tasks._id": { $in: taskId } },
                { $set: { "tasks.$[].isArchived": false } }
            );

            return res.status(200).json({
                success: true,
                message: `${result.deletedCount} tasks removed from archive & restored`,
            });
        }

        const result = await Archive.deleteOne({ taskId, userId });

        await Project.updateOne(
            { "tasks._id": taskId },
            { $set: { "tasks.$.isArchived": false } }
        );

        return res.status(200).json({
            success: true,
            message: "Task removed from archive & restored",
            deletedCount: result.deletedCount
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};


const getAllArchive = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const archiveList = await Archive.find({ userId });

    if (!archiveList || archiveList.length === 0) {
        throw new AppError(404, "No Archived Tasks Found");
    }

    const archiveTaskIds = archiveList.map(item => item.taskId.toString());

    const projects = await Project.find(
        {
            "tasks._id": { $in: archiveTaskIds }
        },
        {
            goal: 1,
            tasks: 1
        }
    );

    const taskMap = new Map<string, { goal: string; task: any }>();

    projects.forEach(project => {
        project.tasks.forEach(task => {
            const taskIdStr = task._id.toString();

            if (archiveTaskIds.includes(taskIdStr)) {
                taskMap.set(taskIdStr, {
                    goal: project.goal,
                    task: task
                });
            }
        });
    });

    const combined = archiveList.map(archiveItem => {
        const tid = archiveItem.taskId.toString();
        const found = taskMap.get(tid);

        return {
            ...archiveItem.toObject(),
            projectGoal: found?.goal || null,
            task: found?.task || null
        };
    });

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Archive retrieved successfully",
        data: combined
    });
};

export const archiveController = {
    addToArchive,
    removeArchive,
    getAllArchive
};