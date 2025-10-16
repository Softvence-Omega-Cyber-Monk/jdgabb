"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const aiChat_services_1 = require("./aiChat.services");
const sendResponse_1 = require("../../../utils/sendResponse");
const getAiChatByUserId = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const result = await aiChat_services_1.aiChatServices.getAiChatByUserId(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "AiChat retrived success",
        data: result
    });
});
const updateAiChat = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await aiChat_services_1.aiChatServices.updateAiChatByUserID(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Updated success",
        data: result
    });
});
exports.chatController = {
    getAiChatByUserId,
    updateAiChat
};
//# sourceMappingURL=aiChat.controller.js.map