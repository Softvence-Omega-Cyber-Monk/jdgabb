"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user", required: true },
    projectId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "project", required: true },
    chat: [
        {
            question: String,
            answer: String
        },
    ],
    plan: { type: String, enum: ["free", "pro", "premium"], default: "free" },
    promptLimit: { type: Number, default: 20 }, // free users get 20
    planExpireAt: { type: Date, default: null }, // only for premium
}, { timestamps: true, versionKey: false });
exports.Chat = mongoose_1.default.model("chat", chatSchema);
//# sourceMappingURL=chat.model.js.map