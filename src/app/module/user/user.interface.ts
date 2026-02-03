import { Types } from "mongoose";


export interface IAuthprovider {
    provider: "Google" | "Credentials", // google | credential,
    providerId: string
};


export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}


export interface IUser extends Document {
    _id?: Types.ObjectId,
    oldPassword?: string,
    username: string,
    email: string,
    password?: string,
    profile?: string,
    isDeleted?: string,
    isVerifid?: boolean,
    role: Role,
    isPaid: boolean,
    subscriptionExpireDate: Date | undefined,

    askLimite : number,
    createLimite : number,

    push?: boolean,
    otp?: string | null,
    auths: IAuthprovider[],
    fcmToken: string,
    product_id?: string
};