"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiChatModel = exports.EContextMemory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var EContextMemory;
(function (EContextMemory) {
    EContextMemory["ResetPerTask"] = "Reset per task";
    EContextMemory["RememberAcrossProjectTask"] = "Remember across project task";
    EContextMemory["RememberEverything"] = "Remember everything";
})(EContextMemory || (exports.EContextMemory = EContextMemory = {}));
const AiChat = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.AiChatModel = mongoose_1.default.model("aiChat", AiChat);
//# sourceMappingURL=aiChat.model.js.map