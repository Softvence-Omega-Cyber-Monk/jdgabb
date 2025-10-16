"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiChatServices = void 0;
const aiChat_model_1 = require("./aiChat.model");
const getAiChatByUserId = async (userId) => {
    const result = await aiChat_model_1.AiChatModel.findOne({ userId: userId });
    return result;
};
const updateAiChatByUserID = async (userId, updateData) => {
    const result = await aiChat_model_1.AiChatModel.findOneAndUpdate({ userId }, updateData, { new: true, runValidators: true });
    return result;
};
exports.aiChatServices = {
    getAiChatByUserId,
    updateAiChatByUserID
};
//# sourceMappingURL=aiChat.services.js.map