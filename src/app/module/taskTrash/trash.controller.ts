import { Request, Response } from "express";
import { TaskTrushModel } from "./trashModel";
import AppError from "../../utils/AppError";
import { sendResponse } from "../../utils/sendResponse";
import { Project } from "../project/project.model";


const addTaskToTrash = async (req: Request, res: Response) => {
    try {
        const { taskId, userId } = req.body;


        if (Array.isArray(taskId)) {
            const data = taskId.map(id => ({ taskId: id, userId }));
            const result = await TaskTrushModel.insertMany(data);


            await Project.updateMany(
                { "tasks._id": { $in: taskId } },
                { $set: { "tasks.$[].isDeleted": true } }
            );

            return res.status(201).json({
                success: true,
                message: "Multiple tasks moved to trash",
                data: result
            });
        }


        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" });
        }


        const result = await TaskTrushModel.create({ taskId, userId });


        await Project.updateOne(
            { "tasks._id": taskId },
            { $set: { "tasks.$.isDeleted": true } }
        );

        res.status(201).json({
            success: true,
            message: "Task moved to trash",
            data: result
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


const trashRemove = async (req: Request, res: Response) => {
    try {
        const { taskId, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" });
        }

        if (Array.isArray(taskId)) {

            const result = await TaskTrushModel.deleteMany({
                taskId: { $in: taskId },
                userId
            });


            await Project.updateMany(
                { "tasks._id": { $in: taskId } },
                { $set: { "tasks.$[].isDeleted": false } }
            );

            return res.status(200).json({
                success: true,
                message: `${result.deletedCount} tasks removed from trash & restored`,
            });
        }

        const result = await TaskTrushModel.deleteOne({ taskId, userId });

        await Project.updateOne(
            { "tasks._id": taskId },
            { $set: { "tasks.$.isDeleted": false } }
        );

        return res.status(200).json({
            success: true,
            message: "Task removed from trash & restored",
            deletedCount: result.deletedCount,
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};




const getAllTrash = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const trashList = await TaskTrushModel.find({ userId: userId });

    if (!trashList || trashList.length === 0) {
        throw new AppError(404, "No Trash Found");
    }

    const trashTaskIds = trashList.map(item => item.taskId);


    const matchedTasks = await Project.find(
        { "tasks._id": { $in: trashTaskIds } },
        { goal: 1, "tasks.$": 1 }
    );


    const combined = trashList.map(trashItem => {
        const relatedProject = matchedTasks.find(project =>
            project.tasks[0]?._id.toString() === trashItem.taskId.toString()
        );

        return {
            ...trashItem.toObject(),
            projectGoal: relatedProject?.goal || null,
            task: relatedProject?.tasks?.[0] || null,
        };
    });

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Trash retrieved successfully",
        data: combined
    });
};


export const trashController = {
    addTaskToTrash,
    trashRemove,
    getAllTrash
}