"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const createJwtToken_1 = require("../../utils/createJwtToken");
const sendResponse_1 = require("../../utils/sendResponse");
const auth_services_1 = require("./auth.services");
const userModel_1 = require("../user/userModel");
const aiChat_model_1 = require("../setting/aiChat/aiChat.model");
const appearance_model_1 = require("../setting/appearance/appearance.model");
const collaboration_model_1 = require("../setting/collaboration/collaboration.model");
const language_model_1 = require("../setting/language/language.model");
const notifications_model_1 = require("../setting/notifications/notifications.model");
const privacy_model_1 = require("../setting/privacy/privacy.model");
const productivity_model_1 = require("../setting/Productivity/productivity.model");
const projectTask_model_1 = require("../setting/projectTask/projectTask.model");
const history_model_1 = require("../hostory/history.model");
const loginUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await auth_services_1.authServices.userLogin(req.body);
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
    console.log(user);
    const token = (0, createJwtToken_1.createJwtToken)(user);
    // setAuthCookie(res, token);
    res.status(200).send({
        success: true,
        message: "Authentication success",
        data: {
            user: user,
            accessToken: token.accessToken
        }
    });
    res.redirect(`jdgabb://auth/google/callback?token=${token}&user=${user}`);
});
const googleFirebaseLogin = (0, catchAsync_1.default)(async (req, res, next) => {
    const { username, email, fcmToken } = req.body;
    if (!username || !email || !fcmToken) {
        throw new AppError_1.default(400, "Username, Email & fcmToken are required");
    }
    let user = await userModel_1.User.findOne({ email });
    if (!user) {
        user = await userModel_1.User.create({
            username,
            email,
            isVerifid: true,
            fcmToken: fcmToken,
            auths: [{ provider: "Google", providerId: email }]
        });
        await Promise.all([
            aiChat_model_1.AiChatModel.create({ userId: user._id }),
            appearance_model_1.AppearanceModel.create({ userId: user._id }),
            collaboration_model_1.CollaborationModel.create({ userId: user._id }),
            language_model_1.languageModel.create({ userId: user._id }),
            notifications_model_1.NotificationModel.create({ userId: user._id }),
            privacy_model_1.PrivacyModel.create({ userId: user._id }),
            productivity_model_1.ProductivityEnhancements.create({ userId: user._id }),
            projectTask_model_1.ProjectTaskModel.create({ userId: user._id }),
            history_model_1.HistoryChatModel.create({ userId: user._id })
        ]);
    }
    else {
        const hasGoogleAuth = user.auths.some((auth) => auth.provider === "Google");
        if (!hasGoogleAuth) {
            user.auths.push({
                provider: "Google",
                providerId: email,
            });
        }
        if (fcmToken) {
            user.fcmToken = fcmToken;
        }
        await user.save();
    }
    const isPaid = user?.subscriptionTypeDate && new Date(user.subscriptionTypeDate) > new Date() ? true : false;
    const { password, ...rest } = user.toObject();
    const tokens = (0, createJwtToken_1.createJwtToken)(user);
    res.status(200).json({
        success: true,
        user: { ...rest, isPaid },
        tokens
    });
});
exports.authController = {
    googleCallBackController,
    loginUser,
    changePassword,
    deleteUser,
    googleFirebaseLogin
};
//# sourceMappingURL=auth.controller.js.map