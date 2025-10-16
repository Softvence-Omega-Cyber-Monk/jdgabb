import { IUser } from "../user/user.interface";
export declare const authServices: {
    userLogin: (payload: Partial<IUser>) => Promise<{
        user: {
            _id: import("mongoose").Types.ObjectId;
            username: string;
            email: string;
            profile?: string;
            isDeleted?: string;
            isVerifid?: boolean;
            role: import("../user/user.interface").Role;
            auths: import("../user/user.interface").IAuthprovider[];
            __v: number;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    changePassword: (payload: Partial<IUser>) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    deleteUser: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=auth.services.d.ts.map