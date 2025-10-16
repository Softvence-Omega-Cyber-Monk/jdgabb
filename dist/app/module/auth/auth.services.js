"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const createJwtToken_1 = require("../../utils/createJwtToken");
const userModel_1 = require("../user/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userLogin = async (payload) => {
    const existUser = await userModel_1.User.findOne({ email: payload.email });
    if (!existUser) {
        throw new AppError_1.default(404, "Invalid user credentials");
    }
    ;
    if (!existUser.password && existUser.auths.some((providerObj) => providerObj.provider === "Google")) {
        throw new AppError_1.default(400, "You are registered with Google authentication.");
    }
    const matchPassword = await bcrypt_1.default.compare(payload.password, existUser.password);
    if (!matchPassword) {
        throw new AppError_1.default(400, "Invalid password");
    }
    ;
    const tokens = (0, createJwtToken_1.createJwtToken)(existUser);
    const { password, ...rest } = existUser.toObject();
    return {
        user: rest,
        tokens: tokens
    };
};
const changePassword = async (payload) => {
    const findUser = await userModel_1.User.findOne({ email: payload.email });
    if (!findUser?.password && findUser?.auths.some((provider) => provider.provider === "Google")) {
        throw new AppError_1.default(400, "You are registered with Google authentication. Please don't try set password.");
    }
    const findndUser = await userModel_1.User.findOneAndUpdate({ email: payload.email }, { password: payload.password }, { new: true, runValidators: true });
    return findndUser;
};
const deleteUser = async (userId) => {
    const findUser = await userModel_1.User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, runValidators: true });
    return findUser;
};
exports.authServices = {
    userLogin,
    changePassword,
    deleteUser
};
//# sourceMappingURL=auth.services.js.map