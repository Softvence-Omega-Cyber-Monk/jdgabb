import mongoose from "mongoose";

const updateHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    isAi: {
        type: Boolean,
        required: true // ai => true , user => false
    },
    text: {
        type: String,
        required: true
    },
    chatType: {
        type: String,
        enum: ['ask', 'create'],
        default: "ask"
    }
}, {
    timestamps: true,
    versionKey: false
});

export const UpdateChatHestory = mongoose.model("UpdateHistory", updateHistorySchema);