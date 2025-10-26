"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkChatAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const userModel_1 = require("../module/user/userModel");
const env_1 = require("../config/env");
const sendNotification_1 = require("../config/sendNotification");
const checkChatAccess = async (req, res, next) => {
    try {
        const accessToken = req.headers?.authorization;
        if (!accessToken) {
            throw new AppError_1.default(401, "No token provided");
        }
        const decoded = jsonwebtoken_1.default.verify(accessToken, env_1.envVers.JWT.JWT_ACCESS_SECRATE);
        const user = await userModel_1.User.findById(decoded.userId);
        if (!user)
            throw new AppError_1.default(404, "User not found");
        if (user.subscriptionTypeDate) {
            const now = new Date();
            const expireDate = new Date(user.subscriptionTypeDate);
            if (now > expireDate) {
                user.subscriptionTypeDate = undefined;
                await user.save();
                (0, sendNotification_1.sendNotification)(String(user?._id), "New Notification", "Your subscription has expired. Please renew.");
                throw new AppError_1.default(403, "Your subscription has expired. Please renew.");
            }
            if (Number(user.dayliChatLimit) <= 0) {
                (0, sendNotification_1.sendNotification)(String(user?._id), "New Notification", "Your daily chat limit has finished. Please wait until tomorrow.");
                throw new AppError_1.default(403, "Your daily chat limit has finished. You can’t chat anymore today.");
            }
            user.dayliChatLimit = Number(user.dayliChatLimit) - 1;
            await user.save();
            req.authUser = user;
            return next();
        }
        if (user.chatUsed >= user.chatLimit) {
            (0, sendNotification_1.sendNotification)(String(user?._id), "New Notification", "Chat limit reached. Please upgrade your plan.");
            throw new AppError_1.default(403, "Chat limit reached. Please upgrade your plan.");
        }
        ;
        user.chatUsed += 1;
        await user.save();
        req.authUser = user;
        next();
    }
    catch (error) {
        console.error("Chat access check failed:", error);
        next(error);
    }
};
exports.checkChatAccess = checkChatAccess;
//# sourceMappingURL=checkChatAccess.js.map