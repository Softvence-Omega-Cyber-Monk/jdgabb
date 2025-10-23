import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.services";
import AppError from "../../utils/AppError";
import { User } from "./userModel";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.email && !req.body.password) {
        throw new AppError(400, "email & password must be required");
    }

    const result = await userServices.registerUser(req.body);

    sendResponse(res, {
        success: true,
        message: "User registraction successfully",
        statusCode: 201,
        data: result,
    })
});

const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id;

    const result = await userServices.getSingleUser(userId as string);

    sendResponse(res, {
        success: true,
        message: "User info retrived successfully",
        statusCode: 200,
        data: result
    })
});

const userSettingInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.authUser._id;

    const result = await userServices.getSingleUserData(userId as string);

    sendResponse(res, {
        success: true,
        message: "User Setting info retrived successfully",
        statusCode: 200,
        data: result
    })
});

const userDeleted = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const deleteUser = await User.findOneAndDelete({ _id: userId });

    if (!deleteUser) {
        throw new AppError(400, "User not deleted");
    };

    res.status(200).json({ success: true, message: "User deleted success" });

});


export const userController = {
    registerUser,
    getSingleUser,
    userSettingInfo,
    userDeleted
}