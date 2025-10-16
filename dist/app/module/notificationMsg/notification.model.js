"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationMsgModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notificationMsgSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "UserId must be required"]
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    isSeen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.notificationMsgModel = mongoose_1.default.model("notificationMsg", notificationMsgSchema);
//# sourceMappingURL=notification.model.js.map