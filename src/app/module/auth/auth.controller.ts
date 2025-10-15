import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/AppError";
import { createJwtToken } from "../../utils/createJwtToken";
import { setAuthCookie } from "../../utils/setAuthCookie";
import { envVers } from "../../config/env";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.services";


const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.userLogin(req.body);
    // setAuthCookie(res, result.tokens);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User login Success",
        data: {
            user : result.user,
            accessToken : result.tokens.accessToken
        }
    })
});


// Google Login / Register

const googleCallBackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (!user) {
        throw new AppError(404, "User not found , Google login faild");
    };

    const token = createJwtToken(user);
    // setAuthCookie(res, token);
    res.status(200).json({
        success: true,
        message: "Authentication success",
        data: {
            user: user,
            accessToken: token.accessToken
        }
    })
    res.redirect(`${envVers.FRONTEND_URL}`);
});

export const authController = {
    googleCallBackController,
    loginUser
}