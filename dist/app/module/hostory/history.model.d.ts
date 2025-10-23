import mongoose from "mongoose";
interface IHistoryItem {
    ai?: string;
    user?: string;
    timeStamp?: Date;
}
interface IHistory {
    userId: mongoose.Schema.Types.ObjectId;
    history: IHistoryItem[];
}
export declare const HistoryChatModel: mongoose.Model<IHistory, {}, {}, {}, mongoose.Document<unknown, {}, IHistory, {}, {}> & IHistory & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=history.model.d.ts.map