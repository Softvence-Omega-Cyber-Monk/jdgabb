import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/AppError";
import { User } from "../module/user/userModel";
import { envVers } from "../config/env";
import { sendNotification } from "../config/sendNotification";

export const checkChatAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers?.authorization;

        if (!accessToken) {
            throw new AppError(401, "No token provided");
        }

        const decoded = jwt.verify(accessToken, envVers.JWT.JWT_ACCESS_SECRATE) as JwtPayload;


        const user = await User.findById(decoded.userId);
        if (!user) throw new AppError(404, "User not found");


        if (user.subscriptionTypeDate) {
            const now = new Date();
            const expireDate = new Date(user.subscriptionTypeDate);

            if (now > expireDate) {
                user.subscriptionTypeDate = undefined;
                await user.save();

                sendNotification(
                    String(user?._id),
                    "New Notification",
                    "Your subscription has expired. Please renew."
                );
                throw new AppError(403, "Your subscription has expired. Please renew.");
            }

            if (Number(user.dayliChatLimit) <= 0) {
                sendNotification(
                    String(user?._id),
                    "New Notification",
                    "Your daily chat limit has finished. Please wait until tomorrow."
                );

                throw new AppError(
                    403,
                    "Your daily chat limit has finished. You can’t chat anymore today."
                );
            }

            user.dayliChatLimit = Number(user.dayliChatLimit) - 1;
            await user.save();

            req.authUser = user;
            return next();
        }


        if (user.chatUsed >= user.chatLimit) {
            sendNotification(String(user?._id), "New Notification", "Chat limit reached. Please upgrade your plan.")
            throw new AppError(403, "Chat limit reached. Please upgrade your plan.");
        };


        user.chatUsed += 1;

        await user.save();

        req.authUser = user;
        next();

    } catch (error) {
        console.error("Chat access check failed:", error);
        next(error);
    }
};
