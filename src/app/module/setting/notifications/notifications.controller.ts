import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { notificationServices } from "./notifications.services";
import { sendResponse } from "../../../utils/sendResponse";

const getNotification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await notificationServices.findNotificationByUserId(id as string);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Notification retrived success",
        data: result
    })
});


const updateNotification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await notificationServices.updateNotificationByUserID(id as string, updatedData);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Notification updated success",
        data: result
    })
});

export const notificationController = {
    getNotification,
    updateNotification
}