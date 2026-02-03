"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.resetPassword = exports.verifyOTP = exports.forgotPassword = void 0;
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
const GenerateOtp_1 = require("../../utils/GenerateOtp");
const sendEmail_1 = require("../../config/sendEmail");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
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
const googleFirebaseLogin = (0, catchAsync_1.default)(async (req, res, next) => {
    const { username, email, fcmToken } = req.body;
    if (!username || !email) {
        throw new AppError_1.default(400, "Username & Email are required");
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
    const { password, ...rest } = user.toObject();
    const tokens = (0, createJwtToken_1.createJwtToken)(user);
    res.status(200).json({
        success: true,
        user: { ...rest },
        tokens
    });
});
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new AppError_1.default(400, "Email is required");
    }
    const user = await userModel_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const otp = (0, GenerateOtp_1.generateOTP)();
    // Hash OTP before saving
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedOTP = await bcrypt_1.default.hash(otp, salt);
    user.otp = hashedOTP;
    await user.save();
    await (0, sendEmail_1.sendEmail)({
        to: email,
        subject: "Password Reset OTP",
        text: `
Your password reset OTP is: ${otp}

This OTP will expire in 5 minutes.
If you did not request this, please ignore this email.
        `,
    });
    res.status(200).json({
        success: true,
        message: "OTP sent to your email",
    });
};
exports.forgotPassword = forgotPassword;
// OTP Verify & Token Generate
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new AppError_1.default(400, "Email and OTP are required");
    }
    const user = await userModel_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    if (!user.otp) {
        throw new AppError_1.default(400, "No OTP found. Please request again.");
    }
    // Compare hashed OTP
    const isValidOTP = await bcrypt_1.default.compare(otp, user.otp);
    if (!isValidOTP) {
        throw new AppError_1.default(400, "Invalid OTP");
    }
    // OTP verified → clear OTP
    user.otp = null;
    await user.save();
    // Generate JWT token
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
    };
    const token = jsonwebtoken_1.default.sign(payload, env_1.envVers.JWT.JWT_REFRESH_SECRATE, {
        expiresIn: "5m"
    });
    console.log(token);
    res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token
    });
};
exports.verifyOTP = verifyOTP;
const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
        throw new AppError_1.default(400, "Token and password are required");
    }
    console.log(token);
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, env_1.envVers.JWT.JWT_REFRESH_SECRATE);
    }
    catch (err) {
        throw new AppError_1.default(401, err.message);
    }
    const user = await userModel_1.User.findById(payload.id);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    user.password = password;
    user.otp = null;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password has been reset successfully",
    });
};
exports.resetPassword = resetPassword;
exports.authController = {
    loginUser,
    changePassword,
    deleteUser,
    googleFirebaseLogin
};
//# sourceMappingURL=auth.controller.js.map