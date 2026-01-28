"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatHestory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const updateHistorySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    projectOrTaskId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.UpdateChatHestory = mongoose_1.default.model("ProjectChatHisotry", updateHistorySchema);
//# sourceMappingURL=ProjectChatModel.js.map