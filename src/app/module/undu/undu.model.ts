import mongoose from "mongoose";
const undoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        taskOrProjectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        undoList: {
            type: [],
            default: [],
        },
    },
    { timestamps: true }
);

export const UndoModel = mongoose.model("undo", undoSchema);