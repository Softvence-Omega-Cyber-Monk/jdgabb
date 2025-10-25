import mongoose, { Types } from "mongoose";
import { Project } from "./project.model";
import AppError from "../../utils/AppError";


const createProject = async (userId: string, goal: string) => {
    const result = await Project.create({ userId: userId, goal: goal });
    return result
};


const addTask = async (projectId: string, task: { task: string, subtasks?: string[], details?: string, taskDueData?: Date }) => {

    const taskToAdd = {
        task: task.task,
        subtasks: [],
        details: "",
    };

    const result = await Project.findOneAndUpdate(
        { _id: projectId },
        {
            $push: { tasks: taskToAdd },
        },
        { new: true }
    );

    return result;
};


const findSingleTask = async (projectid: string, taskId: string) => {
    const result = await Project.findOne({ _id: projectid, "tasks._id": taskId }, { "tasks.$": 1 });
    return result?.tasks[0];
};


const updateTaskStar = async (projectId: string, taskId: string, updates: { isStar?: boolean; isComplite?: boolean }
) => {
    const updateFields: Record<string, any> = {};


    if (typeof updates.isStar === "boolean") {
        updateFields["tasks.$.isStar"] = updates.isStar;
    };

    if (typeof updates.isComplite === "boolean") {
        updateFields["tasks.$.isComplite"] = updates.isComplite;
    }


    if (Object.keys(updateFields).length === 0) {
        throw new Error("No valid fields to update");
    }

    const result = await Project.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(projectId), "tasks._id": new mongoose.Types.ObjectId(taskId) },
        { $set: updateFields },
        { new: true, runValidators: true }
    );

    return result;
};


// const updateTaskStar = async (
//   projectId: string,
//   taskId: string,
//   updates: { isStar?: boolean; isComplite?: boolean; taskDueDate?: Date | string }
// ) => {
//   const updateFields: Record<string, any> = {};

//   if (typeof updates.isStar === "boolean") {
//     updateFields["tasks.$.isStar"] = updates.isStar;
//   }

//   if (typeof updates.isComplite === "boolean") {
//     updateFields["tasks.$.isComplite"] = updates.isComplite;
//   }

//   if (updates.taskDueDate) {
//     updateFields["tasks.$.taskDueDate"] = new Date(updates.taskDueDate);
//   }

//   if (Object.keys(updateFields).length === 0) {
//     throw new Error("No valid fields to update");
//   }

//   const result = await Project.findOneAndUpdate(
//     { _id: new mongoose.Types.ObjectId(projectId), "tasks._id": new mongoose.Types.ObjectId(taskId) },
//     { $set: updateFields },
//     { new: true, runValidators: true }
//   );

//   return result;
// };



const updateTaskDueDate = async (
    projectId: string,
    taskId: string,
    taskDueDate: Date | string
) => {
    if (!taskDueDate) {
        throw new Error("taskDueDate is required");
    }

    const result = await Project.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(projectId), "tasks._id": new mongoose.Types.ObjectId(taskId) },
        { $set: { "tasks.$.taskDueDate": new Date(taskDueDate) } },
        { new: true, runValidators: true }
    );

    return result;
};


const softDeleteTask = async (projectId: string, taskId: string) => {
    const result = await Project.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(projectId), "tasks._id": new mongoose.Types.ObjectId(taskId) },
        { $set: { "tasks.$.isDeleted": true } },
        { new: true, runValidators: true }
    );

    return result;
};

const permanentDeleteTask = async (projectId: string, taskId: string) => {
    const result = await Project.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(projectId) },
        { $pull: { tasks: { _id: new mongoose.Types.ObjectId(taskId) } } },
        { new: true }
    );

    return result;
};

const addSubTask = async (projectId: string, taskId: string, subtaskTitle: string, subTaskDueDate?: Date) => {
    const dataToPush = {
        title: subtaskTitle,
        subTaskDueDate: subTaskDueDate
    };

    const result = await Project.findOneAndUpdate(
        { _id: projectId, "tasks._id": taskId },
        { $push: { "tasks.$.subtasks": dataToPush } },
        { new: true, runValidators: true }
    );

    return result;
};

const findSingleSubTask = async (projectId: string, taskId: string, subTaskId: string) => {
    const result = await Project.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
        { $unwind: "$tasks" },
        { $match: { "tasks._id": new mongoose.Types.ObjectId(taskId) } },
        { $unwind: "$tasks.subtasks" },
        { $match: { "tasks.subtasks._id": new mongoose.Types.ObjectId(subTaskId) } },
        {
            $project: {
                _id: 0,
                subtask: "$tasks.subtasks"
            }
        }
    ]);

    if (!result.length) {
        throw new AppError(400, "Subtask not found");
    }

    return result[0]?.subtask;
};


const addOrUpdateTaskDetails = async (
    projectId: string,
    taskId: string,
    detailsText: string
) => {
    const result = await Project.findOneAndUpdate(
        { _id: projectId, "tasks._id": taskId },
        { $set: { "tasks.$.details": detailsText } },
        { new: true }
    );

    return result;
};


const updateSubtaskStar = async (
    projectId: string,
    taskId: string,
    subtaskId: string,
    updates: { isStar?: boolean; isComplite?: boolean }
) => {
    const updateFields: Record<string, any> = {};

    if (typeof updates.isStar === "boolean") {
        updateFields["tasks.$[task].subtasks.$[subtask].isStar"] = updates.isStar;
    }

    if (typeof updates.isComplite === "boolean") {
        updateFields["tasks.$[task].subtasks.$[subtask].isComplite"] = updates.isComplite;
    }

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No valid fields to update (isStar or isComplite)");
    }

    const result = await Project.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(projectId) },
        { $set: updateFields },
        {
            arrayFilters: [
                { "task._id": new mongoose.Types.ObjectId(taskId) },
                { "subtask._id": new mongoose.Types.ObjectId(subtaskId) },
            ],
            new: true,
            runValidators: true,
        }
    );

    return result;
};


const permanentDeleteSubtask = async (
    projectId: string,
    taskId: string,
    subtaskId: string
) => {
    const result = await Project.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(projectId),
            "tasks._id": new mongoose.Types.ObjectId(taskId),
        },
        {
            $pull: {
                "tasks.$.subtasks": { _id: new mongoose.Types.ObjectId(subtaskId) },
            },
        },
        { new: true }
    );

    return result;
};

const deleteProject = async (projectId: string) => {
    return await Project.findByIdAndDelete(projectId);
}


export const projectServices = {
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
    permanentDeleteSubtask,
    deleteProject,
    updateTaskDueDate
}