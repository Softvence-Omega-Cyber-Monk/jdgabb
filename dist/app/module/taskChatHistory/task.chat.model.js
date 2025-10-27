"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskChatHistory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskChatSchema = new mongoose_1.default.Schema({
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
exports.TaskChatHistory = mongoose_1.default.model("TaskChatHistory", taskChatSchema);
//# sourceMappingURL=task.chat.model.js.map