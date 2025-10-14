import mongoose from "mongoose";

enum EContextMemory {
    ResetPerTask = "Reset per task",
    RememberAcrossProjectTask = "Remember across project task",
    RememberEverything = "Remember everything"
}


const AiChat = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to User model
        required: true,
    },
    contextMemory: {
        type: String,
        enum: [...Object.values(EContextMemory)],
        default: EContextMemory.ResetPerTask
    },
    ProactiveSuggestion: {
        type: Boolean,
        default: true
    },
    AutoCompleteFromChat: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, versionKey: false });

export const AiChatModel = mongoose.model("aiChat", AiChat);
