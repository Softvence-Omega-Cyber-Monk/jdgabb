"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectServices = void 0;
const project_model_1 = require("./project.model");
const createProject = async (userId, goal) => {
    const result = await project_model_1.Project.create({ userId: userId, goal: goal });
    return result;
};
// const addTask = async (projectId: string, task: { task: string }) => {
//     const result = await Project.findOneAndUpdate({ _id: projectId }, {
//         $push: {
//             tasks: task
//         }
//     }, { new: true });
//     return result;
// };
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
const addSubTask = async (projectId, taskId, subTaskData) => {
    const result = await project_model_1.Project.findOneAndUpdate({ _id: projectId, "tasks._id": taskId }, { $push: { "tasks.$.subtasks": subTaskData } }, { new: true, runValidators: true });
    return result;
};
const addOrUpdateTaskDetails = async (projectId, taskId, detailsText) => {
    const result = await project_model_1.Project.findOneAndUpdate({ _id: projectId, "tasks._id": taskId }, { $set: { "tasks.$.details": detailsText } }, { new: true });
    return result;
};
exports.projectServices = {
    createProject,
    addTask,
    addSubTask,
    addOrUpdateTaskDetails
};
//# sourceMappingURL=project.services.js.map