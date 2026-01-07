"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHistoryController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const update_history_model_1 = require("./update.history.model");
const createChatHistory = (0, catchAsync_1.default)(async (req, res, next) => {
    const { userId, text, isAi, chatType } = req.body;
    const result = await update_history_model_1.UpdateChatHestory.create({ userId: userId, text: text, isAi, chatType });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Chat addess success",
        data: result
    });
});
const findUserChat = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.id;
    const chatType = req.params.chatType;
    const result = await update_history_model_1.UpdateChatHestory.find({ userId: userId, chatType });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Chat history retrived successfully",
        data: result
    });
});
exports.updateHistoryController = {
    createChatHistory,
    findUserChat
};
//# sourceMappingURL=update.history.controller.js.map