"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../utils/AppError"));
const TaskModel_1 = __importDefault(require("./TaskModel"));
const updateTaskServices = async () => {
    await TaskModel_1.default.updateOne({ _id: "subtask_id" }, { $set: { status: "completed", description: "Updated description" } });
};
async function getAllSubtasks(taskId) {
    const task = await TaskModel_1.default.findById(taskId).populate("subtasks");
    if (!task)
        throw new AppError_1.default(404, "Task Not Found");
    let allSubtasks = [task];
    for (let subtask of task.subtasks) {
        const nestedSubtasks = await getAllSubtasks(subtask._id);
        allSubtasks = [...allSubtasks, ...nestedSubtasks];
    }
    return allSubtasks;
}
//# sourceMappingURL=UpdateProjectServices.js.map