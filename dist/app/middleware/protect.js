"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectUser = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const userModel_1 = require("../module/user/userModel");
const protectUser = (...auths) => async (req, res, next) => {
    try {
        const accessToken = req.headers?.authorization;
        if (!accessToken) {
            throw new AppError_1.default(403, "No token recived");
        }
        ;
        const verifyToken = jsonwebtoken_1.default.verify(accessToken, env_1.envVers.JWT.JWT_ACCESS_SECRATE);
        const findUser = await userModel_1.User.findById(verifyToken?.userId);
        if (!findUser) {
            throw new AppError_1.default(400, "You are not valid. Please give me valid information");
        }
        if (findUser.isDeleted) {
            throw new AppError_1.default(400, "Your are deleted. Please contact support");
        }
        if (!findUser.role === verifyToken.role) {
            throw new AppError_1.default(401, "You are not permited access this route!");
        }
        if (auths.length && !auths.includes(findUser.role)) {
            throw new AppError_1.default(401, "You are not permited access this route!");
        }
        const userObj = findUser?.toObject();
        const { password, ...rest } = userObj;
        req.authUser = rest;
        next();
    }
    catch (error) {
        console.log("User verifecation faild");
        next(error);
    }
};
exports.protectUser = protectUser;
//# sourceMappingURL=protect.js.map