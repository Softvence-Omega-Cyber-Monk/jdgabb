import mongoose, { Schema } from "mongoose";


const notificationSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        userProfile: {
            type: String,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const FirebaseNotificationModel = mongoose.model("FirebaseNotification", notificationSchema);