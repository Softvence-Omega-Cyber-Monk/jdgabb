"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveController = void 0;
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const addToArchive_model_1 = require("./addToArchive.model");
const project_model_1 = require("../../project/project.model");
const sendResponse_1 = require("../../../utils/sendResponse");
const addToArchive = async (req, res) => {
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
            const result = await addToArchive_model_1.Archive.insertMany(data);
            await project_model_1.Project.updateMany({ "tasks._id": { $in: taskId } }, { $set: { "tasks.$[].isArchived": true } });
            return res.status(201).json({
                success: true,
                message: "Multiple tasks archived successfully",
                data: result
            });
        }
        const archive = await addToArchive_model_1.Archive.create({ taskId, userId });
        await project_model_1.Project.updateOne({ "tasks._id": taskId }, { $set: { "tasks.$.isArchived": true } });
        return res.status(201).json({
            success: true,
            message: "Task archived successfully",
            data: archive
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Archive not added"
        });
    }
};
const removeArchive = async (req, res) => {
    try {
        const { taskId, userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" });
        }
        if (Array.isArray(taskId)) {
            const result = await addToArchive_model_1.Archive.deleteMany({
                taskId: { $in: taskId },
                userId
            });
            await project_model_1.Project.updateMany({ "tasks._id": { $in: taskId } }, { $set: { "tasks.$[].isArchived": false } });
            return res.status(200).json({
                success: true,
                message: `${result.deletedCount} tasks removed from archive & restored`,
            });
        }
        const result = await addToArchive_model_1.Archive.deleteOne({ taskId, userId });
        await project_model_1.Project.updateOne({ "tasks._id": taskId }, { $set: { "tasks.$.isArchived": false } });
        return res.status(200).json({
            success: true,
            message: "Task removed from archive & restored",
            deletedCount: result.deletedCount
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const getAllArchive = async (req, res) => {
    const userId = req.params.id;
    const archiveList = await addToArchive_model_1.Archive.find({ userId: userId });
    if (!archiveList || archiveList.length === 0) {
        throw new AppError_1.default(404, "No Archived Tasks Found");
    }
    const archiveTaskIds = archiveList.map(item => item.taskId);
    const matchedTasks = await project_model_1.Project.find({ "tasks._id": { $in: archiveTaskIds } }, { goal: 1, "tasks.$": 1 });
    const combined = archiveList.map(archiveItem => {
        const relatedProject = matchedTasks.find(project => project.tasks[0]?._id.toString() === archiveItem.taskId.toString());
        return {
            ...archiveItem.toObject(),
            projectGoal: relatedProject?.goal || null,
            task: relatedProject?.tasks?.[0] || null,
        };
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Archive retrieved successfully",
        data: combined
    });
};
exports.archiveController = {
    addToArchive,
    removeArchive,
    getAllArchive
};
//# sourceMappingURL=addToArchive.controller.js.map