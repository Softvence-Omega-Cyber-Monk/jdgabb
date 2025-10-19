import { Types } from "mongoose";
export interface IAuthprovider {
    provider: "Google" | "Credentials";
    providerId: string;
}
export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
export interface IUser {
    _id?: Types.ObjectId;
    oldPassword?: string;
    username: string;
    email: string;
    password?: string;
    profile?: string;
    isDeleted?: string;
    isVerifid?: boolean;
    role: Role;
    auths: IAuthprovider[];
}
//# sourceMappingURL=user.interface.d.ts.map