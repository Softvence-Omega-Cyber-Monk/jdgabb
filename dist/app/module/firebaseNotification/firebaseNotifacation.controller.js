"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseNotifacationController = void 0;
const firebaseNotifacation_mode_1 = require("./firebaseNotifacation.mode;");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createNotification = async (req, res) => {
    try {
        const { userId, title, body } = req.body;
        const notification = await firebaseNotifacation_mode_1.FirebaseNotificationModel.create({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await firebaseNotifacation_mode_1.FirebaseNotificationModel.find();
        res.status(200).json({
            success: true,
            data: notifications
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
const markAsRead = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await firebaseNotifacation_mode_1.FirebaseNotificationModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
        res.status(200).json({
            success: true,
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
const getAllNtg = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.id;
    const result = await firebaseNotifacation_mode_1.FirebaseNotificationModel.find({ userId: userId });
    res.status(200).json({ message: "Success", result: result });
});
exports.firebaseNotifacationController = {
    createNotification,
    getUserNotifications,
    markAsRead,
    getAllNtg
};
//# sourceMappingURL=firebaseNotifacation.controller.js.map