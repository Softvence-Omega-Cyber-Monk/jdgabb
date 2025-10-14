import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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

export const NotificationModel = mongoose.model("notification", notificationSchema);