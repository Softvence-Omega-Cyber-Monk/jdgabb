import mongoose from "mongoose";
import { IUser } from "./user.interface";
export declare enum ESubcription {
    FREE = "0d",
    WEEKLY = "7d",
    TWO_WEEK = "14d",
    MONTHLY = "30d"
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=userModel.d.ts.map