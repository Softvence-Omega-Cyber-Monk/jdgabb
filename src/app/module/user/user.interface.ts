import { Types } from "mongoose";


export interface IAuthprovider {
    provider: "Google" | "Credentials", // google | credential,
    prividerId: string
};


export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}


export interface IUser {
    _id?: Types.ObjectId,
    username: string,
    email: string,
    password?: string,
    profile?: string,
    isDeleted?: string,
    isVerifid?: boolean,
    role: Role,
    auths: IAuthprovider[],
};