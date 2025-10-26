"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationMsgController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const notification_model_1 = require("./notification.model");
const getAllNotification = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.id;
    const result = await notification_model_1.notificationMsgModel.find({ userId: userId });
    res.status(200).json({ result });
});
exports.notificationMsgController = {
    getAllNotification
};
//# sourceMappingURL=notificationMsg.controller.js.map