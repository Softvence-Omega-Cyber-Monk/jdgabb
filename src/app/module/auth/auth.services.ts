import AppError from "../../utils/AppError";
import { createJwtToken } from "../../utils/createJwtToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/userModel";
import bcrypt from "bcrypt";


// const userLogin = async (payload: Partial<IUser>) => {
//     const existUser = await User.findOne({ email: payload.email });

//     if (!existUser) {
//         throw new AppError(404, "Invalid user credentials");
//     };

//     if (!existUser.password && existUser.auths.some((providerObj) => providerObj.provider === "Google")) {
//         throw new AppError(400, "You are registered with Google authentication.")
//     }
//     const fcmToken = {

//     }
//     const matchPassword = await bcrypt.compare(payload.password as string, existUser.password as string);

//     if (!matchPassword) {
//         throw new AppError(400, "Invalid password");
//     };

//     const tokens = createJwtToken(existUser);

//     const { password, ...rest } = existUser.toObject();

//     return {
//         user: rest,
//         tokens: tokens
//     }

// };


const userLogin = async (payload: Partial<IUser>) => {
    const existUser = await User.findOne({ email: payload.email });

    if (!existUser) {
        throw new AppError(404, "Invalid user credentials");
    }


    if (!existUser.password && existUser.auths.some((providerObj) => providerObj.provider === "Google")) {
        throw new AppError(400, "You are registered with Google authentication.");
    }


    const matchPassword = await bcrypt.compare(payload.password as string, existUser.password as string);
    if (!matchPassword) {
        throw new AppError(400, "Invalid password");
    }


    if (payload.fcmToken) {
        existUser.fcmToken = payload.fcmToken;
        await existUser.save();
    }


    const tokens = createJwtToken(existUser);


    const { password, ...rest } = existUser.toObject();

    return {
        user: rest,
        tokens: tokens
    };
};


const changePassword = async (payload: Partial<IUser>) => {

    const findUser = await User.findOne({ email: payload.email });

    if (!findUser) {
        throw new AppError(404, "User not found");
    }

    if (!findUser?.password && findUser?.auths.some((provider) => provider.provider === "Google")) {
        throw new AppError(400, "You are registered with Google authentication. Please don't try set password.");
    };

    const matchPassword = await bcrypt.compare(payload.oldPassword as string, findUser?.password as string);

    if (!matchPassword) {
        throw new AppError(400, "Old password not match.");
    }


    const findndUser = await User.findOneAndUpdate({ email: payload.email }, { password: payload.password }, { new: true, runValidators: true });
    return findndUser;
};

const deleteUser = async (userId: string) => {
    const findUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, runValidators: true });
    return findUser;
}

export const authServices = {
    userLogin,
    changePassword,
    deleteUser
}