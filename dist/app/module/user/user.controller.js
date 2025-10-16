"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const user_services_1 = require("./user.services");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const registerUser = (0, catchAsync_1.default)(async (req, res, next) => {
    if (!req.body.email && !req.body.password) {
        throw new AppError_1.default(400, "email & password must be required");
    }
    const result = await user_services_1.userServices.registerUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User registraction successfully",
        statusCode: 201,
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.id;
    const result = await user_services_1.userServices.getSingleUser(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User info retrived successfully",
        statusCode: 200,
        data: result
    });
});
const userSettingInfo = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser._id;
    const result = await user_services_1.userServices.getSingleUserData(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User Setting info retrived successfully",
        statusCode: 200,
        data: result
    });
});
exports.userController = {
    registerUser,
    getSingleUser,
    userSettingInfo
};
//# sourceMappingURL=user.controller.js.map