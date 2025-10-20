import { Types } from "mongoose";
import { Project } from "./project.model";
import { IProject } from "./project.interfaces";
import { User } from "../user/userModel";


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


const addTask = async (projectId: string, task: { task: string, subtasks?: string[], details?: string }) => {

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



const addSubTask = async (projectId: string, taskId: string, subTaskData: string) => {

    const result = await Project.findOneAndUpdate(
        { _id: projectId, "tasks._id": taskId },

        { $push: { "tasks.$.subtasks": subTaskData } },

        { new: true, runValidators: true }
    );

    return result;
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


export const projectServices = {
    createProject,
    addTask,
    addSubTask,
    addOrUpdateTaskDetails
}