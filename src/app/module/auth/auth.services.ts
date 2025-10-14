import AppError from "../../utils/AppError";
import { createJwtToken } from "../../utils/createJwtToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/userModel";
import bcrypt from "bcrypt";


const userLogin = async (payload: Partial<IUser>) => {
    const existUser = await User.findOne({ email: payload.email });

    if (!existUser) {
        throw new AppError(404, "Invalid user credentials");
    };

    if (!existUser.password && existUser.auths.some((providerObj) => providerObj.provider === "Google")) {
        throw new AppError(400, "You are registered with Google authentication. To log in using email and password, please first log in with Google and set a password, then try again.")
    }

    const matchPassword = await bcrypt.compare(payload.password as string, existUser.password as string);

    if (!matchPassword) {
        throw new AppError(400, "Invalid password");
    };

    const tokens = createJwtToken(existUser);

    const { password, ...rest } = existUser.toObject();

    return {
        user: rest,
        tokens: tokens
    }

};


export const authServices = {
    userLogin
}