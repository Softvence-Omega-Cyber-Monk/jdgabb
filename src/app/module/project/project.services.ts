import mongoose, { Types } from "mongoose";
import { Project } from "./project.model";


const createProject = async (userId: string, goal: string) => {
    const result = await Project.create({ userId: userId, goal: goal });
    return result
};

// const addTask = async (projectId: string, task: { task: string }) => {
//     const result = await Project.findOneAndUpdate({ _id: projectId }, {
//         $push: {
//             tasks: task
//         }
//     }, { new: true });
//     return result;
// };


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



// const addSubTask = async (projectId: string, taskId: string, subTaskData: string) => {

//     const result = await Project.findOneAndUpdate(
//         { _id: projectId, "tasks._id": taskId },

//         { $push: { "tasks.$.subtasks": subTaskData } },

//         { new: true, runValidators: true }
//     );

//     return result;
// };


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


const findSingleTask = async (projectid: string, taskId: string) => {
    const result = await Project.findOne({ _id: projectid, "tasks._id": taskId }, { "tasks.$": 1 });
    return result?.tasks[0];
}


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

const updateTaskStar = async (projectId: string, taskId: string, isStar: boolean) => {
    const result = await Project.findOneAndUpdate(
        { _id: projectId, "tasks._id": taskId },
        { $set: { "tasks.$.isStar": isStar } },
        { new: true, runValidators: true }
    );

    return result;
};

// Incomplite
const updateSubtaskStar = async (
    projectId: string,
    taskId: string,
    subtaskId: string,
    isStar: boolean
) => {
    console.log("Project ID:", projectId);
    console.log("Task ID:", taskId);
    console.log("Subtask ID:", subtaskId);
    console.log("Is Star:", isStar);

    const result = await Project.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(projectId),
            "tasks._id": new mongoose.Types.ObjectId(taskId),
            "tasks.subtasks._id": new mongoose.Types.ObjectId(subtaskId),
        },
        { 
            $set: { "tasks.$.subtasks.$[subtask].isStar": isStar }
        },
        {
            arrayFilters: [{ "subtask._id": new mongoose.Types.ObjectId(subtaskId) }],
            new: true,
        }
    );

    if (!result) {
        console.log("No subtask found or updated.");
    }

    return result;
};



export const projectServices = {
    createProject,
    addTask,
    addSubTask,
    addOrUpdateTaskDetails,
    findSingleTask,
    updateTaskStar,
    updateSubtaskStar
}