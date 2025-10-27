import { NextFunction, Request, Response } from "express";
import { FirebaseNotificationModel } from "./firebaseNotifacation.mode;";
import catchAsync from "../../utils/catchAsync";


const createNotification = async (req: Request, res: Response) => {
    try {
        const { userId, title, body } = req.body;

        const notification = await FirebaseNotificationModel.create({
            userId,
            title,
            body,
            timestamp: new Date(),
        });

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

const getUserNotifications = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const notifications = await FirebaseNotificationModel.find();

        console.log(notifications);

        res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

const markAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updated = await FirebaseNotificationModel.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updated,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};


const getAllNtg = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const result = await FirebaseNotificationModel.find({ userId: userId });

    res.status(200).json({ message: "Success", result: result });
})

export const firebaseNotifacationController = {
    createNotification,
    getUserNotifications,
    markAsRead,
    getAllNtg
}