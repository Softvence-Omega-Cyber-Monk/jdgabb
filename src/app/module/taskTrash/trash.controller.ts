import { Request, Response } from "express";
import { TaskTrushModel } from "./trashModel";
import AppError from "../../utils/AppError";
import { sendResponse } from "../../utils/sendResponse";


const addTaskToTrash = async (req: Request, res: Response) => {
    try {
        const { taskId, userId } = req.body;

        if (Array.isArray(taskId)) {
            const data = taskId.map(id => ({ taskId: id, userId: userId }));
            const result = await TaskTrushModel.insertMany(data);

            return res.status(201).json({
                success: true,
                message: "Multiple tasks moved to trash",
                data: result
            });
        }

        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" });
        }

        const result = await TaskTrushModel.create({ taskId, userId: userId });

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
                userId: userId
            });

            return res.status(200).json({
                success: true,
                message: `${result.deletedCount} tasks remove from trash`,
            });
        }

        const result = await TaskTrushModel.deleteOne({ taskId: taskId, userId: userId });

        res.status(200).json({
            success: true,
            message: "Task remove from trash",
            deletedCount: result.deletedCount,
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getAllTrash = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const result = await TaskTrushModel.find({ userId: userId });

    if (!result) throw new AppError(404, "No Trash Found");

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Trash Retrived successfully",
        data: result
    })
}

export const trashController = {
    addTaskToTrash,
    trashRemove,
    getAllTrash
}