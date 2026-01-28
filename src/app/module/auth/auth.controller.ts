import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/AppError";
import { createJwtToken } from "../../utils/createJwtToken";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.services";
import { User } from "../user/userModel";
import { AiChatModel } from "../setting/aiChat/aiChat.model";
import { AppearanceModel } from "../setting/appearance/appearance.model";
import { CollaborationModel } from "../setting/collaboration/collaboration.model";
import { languageModel } from "../setting/language/language.model";
import { NotificationModel } from "../setting/notifications/notifications.model";
import { PrivacyModel } from "../setting/privacy/privacy.model";
import { ProductivityEnhancements } from "../setting/Productivity/productivity.model";
import { ProjectTaskModel } from "../setting/projectTask/projectTask.model";
import { HistoryChatModel } from "../hostory/history.model";
import { generateOTP } from "../../utils/GenerateOtp";
import { sendEmail } from "../../config/sendEmail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { envVers } from "../../config/env";


const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.userLogin(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User login Success",
        data: {
            user: result.user,
            accessToken: result.tokens.accessToken
        }
    })
});

const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await authServices.changePassword(req.body);
    sendResponse(res, {
        success: true,
        message: "Password change success",
        statusCode: 200,
        data: null
    })

})
const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await authServices.deleteUser(id as string);

    sendResponse(res, {
        success: true,
        message: "User deleted success",
        statusCode: 200,
        data: null
    })

});


const googleFirebaseLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, fcmToken } = req.body;

    if (!username || !email) {
        throw new AppError(400, "Username & Email are required");
    }

    let user = await User.findOne({ email });

    if (!user) {

        user = await User.create({
            username,
            email,
            isVerifid: true,
            fcmToken: fcmToken,
            auths: [{ provider: "Google", providerId: email }]
        });


        await Promise.all([
            AiChatModel.create({ userId: user._id }),
            AppearanceModel.create({ userId: user._id }),
            CollaborationModel.create({ userId: user._id }),
            languageModel.create({ userId: user._id }),
            NotificationModel.create({ userId: user._id }),
            PrivacyModel.create({ userId: user._id }),
            ProductivityEnhancements.create({ userId: user._id }),
            ProjectTaskModel.create({ userId: user._id }),
            HistoryChatModel.create({ userId: user._id })
        ]);

    } else {

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
    const tokens = createJwtToken(user);

    res.status(200).json({
        success: true,
        user: { ...rest, isPaid },
        tokens
    });
});



export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        throw new AppError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(404, "User not found");
    }

    const otp = generateOTP();

    // Hash OTP before saving
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);

    user.otp = hashedOTP;

    await user.save();

    await sendEmail({
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



// OTP Verify & Token Generate
export const verifyOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new AppError(400, "Email and OTP are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(404, "User not found");
    }

    if (!user.otp) {
        throw new AppError(400, "No OTP found. Please request again.");
    }

    // Compare hashed OTP
    const isValidOTP = await bcrypt.compare(otp, user.otp);
    if (!isValidOTP) {
        throw new AppError(400, "Invalid OTP");
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

    const token = jwt.sign(payload, envVers.JWT.JWT_REFRESH_SECRATE, {
        expiresIn: "5m"
    });

    console.log(token);

    res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token
    });
};


export const resetPassword = async (req: Request, res: Response) => {
    const { token, password } = req.body;

    if (!token || !password) {
        throw new AppError(400, "Token and password are required");
    }

    console.log(token);

    // Verify token
    let payload: any;
    try {
        payload = jwt.verify(token, envVers.JWT.JWT_REFRESH_SECRATE);
    } catch (err : any) {
        throw new AppError(401, err.message);
    }

    // Find user
    const user = await User.findById(payload.id);
    if (!user) {
        throw new AppError(404, "User not found");
    }

    // Update password (hashed automatically via pre-save hook)
    user.password = password;

    // Clear OTP just in case
    user.otp = null;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password has been reset successfully",
    });
};


export const authController = {
    loginUser,
    changePassword,
    deleteUser,
    googleFirebaseLogin
}