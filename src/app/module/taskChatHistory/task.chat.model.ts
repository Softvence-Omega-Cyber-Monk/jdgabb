import mongoose from "mongoose";

const taskChatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    isAi: {
        type: Boolean
    },
    message: {
        type: String
    }

}, {
    timestamps: true,
    versionKey: false
});


export const TaskChatHistory = mongoose.model("TaskChatHistory", taskChatSchema);