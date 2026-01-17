import { Types } from "mongoose";
import AppError from "../../utils/AppError";
import Task from "./TaskModel";



const updateTaskServices = async () => {
    await Task.updateOne(
        { _id: "subtask_id" },
        { $set: { status: "completed", description: "Updated description" } }
    );
};



async function getAllSubtasks(taskId: Types.ObjectId) {
    const task = await Task.findById(taskId).populate("subtasks");

    if (!task) throw new AppError(404, "Task Not Found")

    let allSubtasks = [task]; 

    for (let subtask of task.subtasks) {
        const nestedSubtasks = await getAllSubtasks(subtask._id);
        allSubtasks = [...allSubtasks, ...nestedSubtasks]; 
    }

    return allSubtasks;
}