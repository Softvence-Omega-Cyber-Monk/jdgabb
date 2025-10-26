import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { notificationMsgModel } from "./notification.model";

const getAllNotification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const result = await notificationMsgModel.find({ userId: userId });

    res.status(200).json({ result });

});

export const notificationMsgController = {
    getAllNotification
}