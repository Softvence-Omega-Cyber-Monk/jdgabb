import mongoose from "mongoose";

const updateHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    isFile: {
        type: Boolean,
        required: true // ai => true , user => false
    },
    text: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
    versionKey: false
});

export const UpdateChatHestory = mongoose.model("UpdateHistory" , updateHistorySchema);