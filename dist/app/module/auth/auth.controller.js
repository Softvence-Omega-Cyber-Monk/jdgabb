"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const createJwtToken_1 = require("../../utils/createJwtToken");
const env_1 = require("../../config/env");
const sendResponse_1 = require("../../utils/sendResponse");
const auth_services_1 = require("./auth.services");
const loginUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await auth_services_1.authServices.userLogin(req.body);
    // setAuthCookie(res, result.tokens);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User login Success",
        data: {
            user: result.user,
            accessToken: result.tokens.accessToken
        }
    });
});
const changePassword = (0, catchAsync_1.default)(async (req, res, next) => {
    await auth_services_1.authServices.changePassword(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Password change success",
        statusCode: 200,
        data: null
    });
});
const deleteUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    await auth_services_1.authServices.deleteUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User deleted success",
        statusCode: 200,
        data: null
    });
});
// Google Login / Register
const googleCallBackController = (0, catchAsync_1.default)(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new AppError_1.default(404, "User not found , Google login faild");
    }
    ;
    const token = (0, createJwtToken_1.createJwtToken)(user);
    // setAuthCookie(res, token);
    res.status(200).json({
        success: true,
        message: "Authentication success",
        data: {
            user: user,
            accessToken: token.accessToken
        }
    });
    res.redirect(`${env_1.envVers.FRONTEND_URL}`);
});
exports.authController = {
    googleCallBackController,
    loginUser,
    changePassword,
    deleteUser
};
//# sourceMappingURL=auth.controller.js.map