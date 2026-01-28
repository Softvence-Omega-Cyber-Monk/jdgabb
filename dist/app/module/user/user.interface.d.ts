import { Types } from "mongoose";
export interface IAuthprovider {
    provider: "Google" | "Credentials";
    providerId: string;
}
export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
export interface IUser extends Document {
    _id?: Types.ObjectId;
    oldPassword?: string;
    username: string;
    email: string;
    password?: string;
    profile?: string;
    isDeleted?: string;
    isVerifid?: boolean;
    role: Role;
    isPaid: boolean;
    dayliChatLimit: Number;
    chatLimit: number;
    weellyChatLimite?: Number;
    totalChatUseInWeek?: Number;
    subscriptionTypeDate: Date | undefined;
    subscriptionType: string;
    chatUsed: number;
    push?: boolean;
    otp?: string | null;
    auths: IAuthprovider[];
    fcmToken: string;
}
//# sourceMappingURL=user.interface.d.ts.map