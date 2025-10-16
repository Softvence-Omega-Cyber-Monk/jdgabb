"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const notifications_services_1 = require("./notifications.services");
const sendResponse_1 = require("../../../utils/sendResponse");
const getNotification = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const result = await notifications_services_1.notificationServices.findNotificationByUserId(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Notification retrived success",
        data: result
    });
});
const updateNotification = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await notifications_services_1.notificationServices.updateNotificationByUserID(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Notification updated success",
        data: result
    });
});
exports.notificationController = {
    getNotification,
    updateNotification
};
//# sourceMappingURL=notifications.controller.js.map