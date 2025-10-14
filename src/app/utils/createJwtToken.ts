import { envVers } from "../config/env";
import { IUser } from "../module/user/user.interface"
import jwt from "jsonwebtoken";

export const createJwtToken = (userInfo: Partial<IUser>) => {
    const data = {
        userId: userInfo._id,
        email: userInfo.email,
        role: userInfo.role
    };

    const createAccessToken = () => {
        const token = jwt.sign(data, envVers.JWT.JWT_ACCESS_SECRATE, { expiresIn: "2d" });
        return token
    };
    const createRefreshToken = () => {
        const token = jwt.sign(data, envVers.JWT.JWT_REFRESH_SECRATE, { expiresIn: "10d" });
        return token;
    };

    return {
        accessToken: createAccessToken(),
        refreshToken: createRefreshToken()
    }

}