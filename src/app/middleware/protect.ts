import { NextFunction, Request, Response } from "express"
import AppError from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVers } from "../config/env";
import { User } from "../module/user/userModel";


export const protectUser = (...auths: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers?.authorization;

        if (!accessToken) {
            throw new AppError(403, "No token recived");
        };

        const verifyToken = jwt.verify(accessToken as string, envVers.JWT.JWT_ACCESS_SECRATE) as JwtPayload;

        const findUser = await User.findById(verifyToken?.userId);

        if (!findUser) {
            throw new AppError(400, "You are not valid. Please give me valid information");
        }

        if (findUser.isDeleted) {
            throw new AppError(400, "Your are deleted. Please contact support");
        }

        if (!findUser.role === verifyToken.role) {
            throw new AppError(401, "You are not permited access this route!");
        }

        if (auths.length && !auths.includes(findUser.role)) {
            throw new AppError(401, "You are not permited access this route!");
        }

        const userObj = findUser?.toObject();

        const { password, ...rest } = userObj;
        req.authUser = rest

        next();

    } catch (error) {
        console.log("User verifecation faild");
        next(error);
    }
}