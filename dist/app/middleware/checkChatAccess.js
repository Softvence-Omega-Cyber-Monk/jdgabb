"use strict";
// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import AppError from "../utils/AppError";
// import { User } from "../module/user/userModel";
// import { envVers } from "../config/env";
// import { sendNotification } from "../config/sendNotification";
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
        const now = new Date();
        // 🔹 If user has subscription
        if (user.subscriptionTypeDate) {
            const expireDate = new Date(user.subscriptionTypeDate);
            // ✅ Check if subscription expired
            if (now > expireDate) {
                user.subscriptionTypeDate = undefined;
                await user.save();
                (0, sendNotification_1.sendNotification)(String(user._id), "New Notification", "Your subscription has expired. Please renew.");
                return res
                    .status(400)
                    .json({
                    isSubscription: false,
                    statusSecrate: 800,
                    message: "Your subscription has expired. Please renew."
                });
            }
            // ✅ Check daily chat limit
            if (Number(user.dayliChatLimit) <= 0) {
                (0, sendNotification_1.sendNotification)(String(user._id), "New Notification", "Your daily chat limit has finished. Please wait until tomorrow.");
                throw new AppError_1.default(403, "Your daily chat limit has finished. You can’t chat anymore today.");
            }
            // ✅ Deduct daily chat usage
            user.dayliChatLimit = Number(user.dayliChatLimit) - 1;
            user.totalChatUseInWeek = Number(user.totalChatUseInWeek) + 1;
            await user.save();
            req.authUser = user;
            return next();
        }
        // 🔹 If user has no subscription (Free Plan)
        if (Number(user.chatUsed) >= Number(user.chatLimit)) {
            (0, sendNotification_1.sendNotification)(String(user._id), "New Notification", "Chat limit reached. Please upgrade your plan.");
            return res
                .status(400)
                .json({
                isSubscription: false,
                statusSecrate: 800,
                message: "Chat limit reached. Please upgrade your plan."
            });
        }
        // ✅ Update chat usage for free users
        user.chatUsed = Number(user.chatUsed) + 1;
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