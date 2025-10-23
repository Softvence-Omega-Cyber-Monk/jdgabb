"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const history_model_1 = require("./history.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getAllHistory = (0, catchAsync_1.default)(async (req, res, next) => {
    const staticMessage = `Great! Type into the chat bar below what sort of project you want to start. We can think of an idea together - do you want to be healthier, start a business, find love, find your passion, save time, or speed through your homework? What's a goal you have? It can be anything!`;
    const userId = req.params.id;
    const result = await history_model_1.HistoryChatModel.findOne({ userId: userId });
    res.status(200).json({
        statucMessage: staticMessage,
        userChatHistory: result
    });
});
const addUserChatToHistory = async (req, res) => {
    try {
        const { userId, user } = req.body;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId must be required",
            });
        }
        const objectUserId = new mongoose_1.default.Types.ObjectId(userId);
        const existingHistory = await history_model_1.HistoryChatModel.findOne({ userId: objectUserId });
        if (!existingHistory) {
            return res.status(404).json({
                success: false,
                message: "User history not found",
            });
        }
        const newChat = {
            user,
            timeStamp: new Date(),
        };
        existingHistory.history.push(newChat);
        await existingHistory.save();
        const createdChat = existingHistory.history[existingHistory.history.length - 1];
        res.status(200).json({
            success: true,
            message: "Chat added successfully",
            data: createdChat,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
const addAIChatToHistory = async (req, res) => {
    try {
        const { userId, historyId, ai } = req.body;
        if (!userId || !historyId || !ai) {
            return res.status(400).json({
                success: false,
                message: "userId, historyId & AI message must be required",
            });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(userId) || !mongoose_1.default.Types.ObjectId.isValid(historyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId or historyId",
            });
        }
        const objectUserId = new mongoose_1.default.Types.ObjectId(userId);
        const objectHistoryId = new mongoose_1.default.Types.ObjectId(historyId);
        const updatedHistory = await history_model_1.HistoryChatModel.findOneAndUpdate({ userId: objectUserId, "history._id": objectHistoryId }, { $set: { "history.$.ai": ai } }, { new: true });
        if (!updatedHistory) {
            return res.status(404).json({
                success: false,
                message: "History not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "AI message successfully added",
            data: updatedHistory,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.historyController = {
    getAllHistory,
    addUserChatToHistory,
    addAIChatToHistory
};
//# sourceMappingURL=hostory.controller.js.map