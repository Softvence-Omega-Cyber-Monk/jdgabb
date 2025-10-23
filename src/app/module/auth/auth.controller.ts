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


const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.userLogin(req.body);
    // setAuthCookie(res, result.tokens);
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

})
// Google Login / Register

const googleCallBackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (!user) {
        throw new AppError(404, "User not found , Google login faild");
    };

    console.log(user);

    const token = createJwtToken(user);
    // setAuthCookie(res, token);
    res.status(200).send({
        success: true,
        message: "Authentication success",
        data: {
            user: user,
            accessToken: token.accessToken
        }
    })
    res.redirect(`jdgabb://auth/google/callback?token=${token}&user=${user}`);
});


const googleFirebaseLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;

    if (!username || !email) {
        throw new AppError(400, "Username & Email are required");
    }


    let user = await User.findOne({ email });


    if (!user) {
        user = await User.create({ username, email, isVerifid: true, auths: [{ provider: "google", providerId: email }] });

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
            await user.save();
        }
    };

    const token = createJwtToken(user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Google authentication success",
        data: {
            accessToken: token.accessToken,
            user,
        },
    });
});


export const authController = {
    googleCallBackController,
    loginUser,
    changePassword,
    deleteUser,
    googleFirebaseLogin
}