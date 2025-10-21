import mongoose from "mongoose";


const chatSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project", required: true },

        chat: [
            {
                question: String,
                answer: String
            },
        ],

        plan: { type: String, enum: ["free", "pro", "premium"], default: "free" },
        promptLimit: { type: Number, default: 20 }, // free users get 20
        planExpireAt: { type: Date, default: null }, // only for premium
    },
    { timestamps: true, versionKey: false }
);

export const Chat = mongoose.model("chat", chatSchema);