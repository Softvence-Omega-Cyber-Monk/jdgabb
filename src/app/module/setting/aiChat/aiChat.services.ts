import { IAiChat } from "./aiChat.interfaces";
import { AiChatModel } from "./aiChat.model"

const getAiChatByUserId = async (userId: string) => {
    const result = await AiChatModel.findOne({ userId: userId });
    return result;
};

const updateAiChatByUserID = async (userId: string, updateData: Partial<IAiChat>) => {
    const result = await AiChatModel.findOneAndUpdate({userId}, updateData, { new: true, runValidators: true });
    return result;
}

export const aiChatServices = {
    getAiChatByUserId,
    updateAiChatByUserID
}