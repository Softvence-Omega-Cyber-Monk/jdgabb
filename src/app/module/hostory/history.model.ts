import mongoose, { Schema, Document } from "mongoose";

interface IHistoryItem {
    ai?: string;
    user?: string;
    timeStamp?: Date;
}

interface IHistory {
    userId: mongoose.Schema.Types.ObjectId;
    history: IHistoryItem[];
}

const historySchema = new Schema<IHistory>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        history: [
            {
                ai: { type: String },
                user: { type: String },
                timeStamp: { type: Date, default: Date.now }
            },
        ],
    },
    { timestamps: true }
);

export const HistoryChatModel = mongoose.model<IHistory>("History", historySchema);
