"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trashController = void 0;
const trashModel_1 = require("./trashModel");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const sendResponse_1 = require("../../utils/sendResponse");
const project_model_1 = require("../project/project.model");
const addTaskToTrash = async (req, res) => {
    try {
        const { taskId, userId } = req.body;
        if (Array.isArray(taskId)) {
            const data = taskId.map(id => ({ taskId: id, userId }));
            const result = await trashModel_1.TaskTrushModel.insertMany(data);
            await project_model_1.Project.updateMany({ "tasks._id": { $in: taskId } }, { $set: { "tasks.$[].isDeleted": true } });
            return res.status(201).json({
                success: true,
                message: "Multiple tasks moved to trash",
                data: result
            });
        }
        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" });
        }
        const result = await trashModel_1.TaskTrushModel.create({ taskId, userId });
        await project_model_1.Project.updateOne({ "tasks._id": taskId }, { $set: { "tasks.$.isDeleted": true } });
        res.status(201).json({
            success: true,
            message: "Task moved to trash",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const trashRemove = async (req, res) => {
    try {
        const { taskId, userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" });
        }
        if (Array.isArray(taskId)) {
            const result = await trashModel_1.TaskTrushModel.deleteMany({
                taskId: { $in: taskId },
                userId
            });
            await project_model_1.Project.updateMany({ "tasks._id": { $in: taskId } }, { $set: { "tasks.$[].isDeleted": false } });
            return res.status(200).json({
                success: true,
                message: `${result.deletedCount} tasks removed from trash & restored`,
            });
        }
        const result = await trashModel_1.TaskTrushModel.deleteOne({ taskId, userId });
        await project_model_1.Project.updateOne({ "tasks._id": taskId }, { $set: { "tasks.$.isDeleted": false } });
        return res.status(200).json({
            success: true,
            message: "Task removed from trash & restored",
            deletedCount: result.deletedCount,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const getAllTrash = async (req, res) => {
    const userId = req.params.id;
    const trashList = await trashModel_1.TaskTrushModel.find({ userId: userId });
    if (!trashList || trashList.length === 0) {
        throw new AppError_1.default(404, "No Trash Found");
    }
    const trashTaskIds = trashList.map(item => item.taskId);
    const matchedTasks = await project_model_1.Project.find({ "tasks._id": { $in: trashTaskIds } }, { goal: 1, "tasks.$": 1 });
    const combined = trashList.map(trashItem => {
        const relatedProject = matchedTasks.find(project => project.tasks[0]?._id.toString() === trashItem.taskId.toString());
        return {
            ...trashItem.toObject(),
            projectGoal: relatedProject?.goal || null,
            task: relatedProject?.tasks?.[0] || null,
        };
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Trash retrieved successfully",
        data: combined
    });
};
exports.trashController = {
    addTaskToTrash,
    trashRemove,
    getAllTrash
};
//# sourceMappingURL=trash.controller.js.map