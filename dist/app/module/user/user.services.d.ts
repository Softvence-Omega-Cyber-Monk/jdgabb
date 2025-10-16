import mongoose from "mongoose";
import { IUser } from "./user.interface";
export declare const userServices: {
    registerUser: (payload: Partial<IUser>) => Promise<(mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | undefined>;
    getSingleUser: (id: string) => Promise<(mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getSingleUserData: (id: string) => Promise<any[]>;
};
//# sourceMappingURL=user.services.d.ts.map