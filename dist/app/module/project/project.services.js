"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const project_model_1 = require("./project.model");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const createProject = async (userId, goal) => {
    const result = await project_model_1.Project.create({ userId: userId, goal: goal });
    return result;
};
const addTask = async (projectId, task) => {
    const taskToAdd = {
        task: task.task,
        subtasks: [],
        details: "",
    };
    const result = await project_model_1.Project.findOneAndUpdate({ _id: projectId }, {
        $push: { tasks: taskToAdd },
    }, { new: true });
    return result;
};
const findSingleTask = async (projectid, taskId) => {
    const result = await project_model_1.Project.findOne({ _id: projectid, "tasks._id": taskId }, { "tasks.$": 1 });
    return result?.tasks[0];
};
const updateTaskStar = async (projectId, taskId, isStar) => {
    const result = await project_model_1.Project.findOneAndUpdate({ _id: projectId, "tasks._id": taskId }, { $set: { "tasks.$.isStar": isStar } }, { new: true, runValidators: true });
    return result;
};
const softDeleteTask = async (projectId, taskId) => {
    const result = await project_model_1.Project.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(projectId), "tasks._id": new mongoose_1.default.Types.ObjectId(taskId) }, { $set: { "tasks.$.isDeleted": true } }, { new: true, runValidators: true });
    return result;
};
const permanentDeleteTask = async (projectId, taskId) => {
    const result = await project_model_1.Project.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(projectId) }, { $pull: { tasks: { _id: new mongoose_1.default.Types.ObjectId(taskId) } } }, { new: true });
    return result;
};
const addSubTask = async (projectId, taskId, subtaskTitle, subTaskDueDate) => {
    const dataToPush = {
        title: subtaskTitle,
        subTaskDueDate: subTaskDueDate
    };
    const result = await project_model_1.Project.findOneAndUpdate({ _id: projectId, "tasks._id": taskId }, { $push: { "tasks.$.subtasks": dataToPush } }, { new: true, runValidators: true });
    return result;
};
const findSingleSubTask = async (projectId, taskId, subTaskId) => {
    const result = await project_model_1.Project.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(projectId) } },
        { $unwind: "$tasks" },
        { $match: { "tasks._id": new mongoose_1.default.Types.ObjectId(taskId) } },
        { $unwind: "$tasks.subtasks" },
        { $match: { "tasks.subtasks._id": new mongoose_1.default.Types.ObjectId(subTaskId) } },
        {
            $project: {
                _id: 0,
                subtask: "$tasks.subtasks"
            }
        }
    ]);
    if (!result.length) {
        throw new AppError_1.default(400, "Subtask not found");
    }
    return result[0]?.subtask;
};
const addOrUpdateTaskDetails = async (projectId, taskId, detailsText) => {
    const result = await project_model_1.Project.findOneAndUpdate({ _id: projectId, "tasks._id": taskId }, { $set: { "tasks.$.details": detailsText } }, { new: true });
    return result;
};
const updateSubtaskStar = async (projectId, taskId, subtaskId, isStar) => {
    const result = await project_model_1.Project.findOneAndUpdate({
        _id: new mongoose_1.default.Types.ObjectId(projectId),
    }, {
        $set: {
            "tasks.$[task].subtasks.$[subtask].isStar": isStar
        }
    }, {
        arrayFilters: [
            { "task._id": new mongoose_1.default.Types.ObjectId(taskId) },
            { "subtask._id": new mongoose_1.default.Types.ObjectId(subtaskId) }
        ],
        new: true
    });
    if (!result) {
        console.log("No subtask found or updated.");
    }
    return result;
};
const permanentDeleteSubtask = async (projectId, taskId, subtaskId) => {
    const result = await project_model_1.Project.findOneAndUpdate({
        _id: new mongoose_1.default.Types.ObjectId(projectId),
        "tasks._id": new mongoose_1.default.Types.ObjectId(taskId),
    }, {
        $pull: {
            "tasks.$.subtasks": { _id: new mongoose_1.default.Types.ObjectId(subtaskId) },
        },
    }, { new: true });
    return result;
};
exports.projectServices = {
    createProject,
    addTask,
    addSubTask,
    addOrUpdateTaskDetails,
    findSingleTask,
    findSingleSubTask,
    updateTaskStar,
    updateSubtaskStar,
    softDeleteTask,
    permanentDeleteTask,
    permanentDeleteSubtask
};
//# sourceMappingURL=project.services.js.map