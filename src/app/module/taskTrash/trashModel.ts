import mongoose, { model, Schema } from "mongoose";

const taskTrashSchema = new Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

}, {
    timestamps: true,
    versionKey: false
});


export const TaskTrushModel = model("TaskTrash", taskTrashSchema);