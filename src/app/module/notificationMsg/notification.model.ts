import mongoose from "mongoose";

const notificationMsgSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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


export const notificationMsgModel = mongoose.model("notificationMsg", notificationMsgSchema);