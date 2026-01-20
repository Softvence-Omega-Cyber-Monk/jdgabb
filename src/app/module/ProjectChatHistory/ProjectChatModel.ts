import mongoose from "mongoose";

const updateHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    projectOrTaskId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isAi: {
        type: Boolean,
        required: true // ai => true , user => false
    },
    chatType: {
        type: String,
        enum: ["ask", "create"]
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export const UpdateChatHestory = mongoose.model("ProjectChatHisotry", updateHistorySchema);