"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user", // Reference to User model
        required: true,
    },
    push: {
        type: Boolean,
        default: true,
    },
    inAppReminder: {
        type: Boolean,
        default: true,
    },
    smart: {
        type: Boolean,
        default: false,
    },
    snoozeOptions: {
        type: [Number],
        default: [5, 10, 30],
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.NotificationModel = mongoose_1.default.model("notification", notificationSchema);
//# sourceMappingURL=notifications.model.js.map