import mongoose, { model, Schema } from "mongoose";

const archiveSchema = new Schema({
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


export const Archive = model("Archive", archiveSchema);