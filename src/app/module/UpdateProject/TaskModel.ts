import mongoose from "mongoose";

// Task Schema
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: null,
        },
        compliteTarget: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed", "archived"],
            default: "pending",
        },

        isDeleted: { type: Boolean, default: false },
        isComplite: { type: Boolean, default: false },
        isArchived: { type: Boolean, default: false },
        isStar: { type: Boolean, default: false },

        parentTaskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            default: null,
        },
        subtasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
