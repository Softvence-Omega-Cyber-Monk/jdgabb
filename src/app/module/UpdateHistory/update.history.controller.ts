import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UpdateChatHestory } from "./update.history.model";


const createChatHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId, text, isAi, chatType } = req.body;
    const result = await UpdateChatHestory.create({ userId: userId, text: text, isAi, chatType });
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Chat addess success",
        data: result
    });
});

const findUserChat = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const chatType = req.params.chatType;

    const result = await UpdateChatHestory.find({ userId: userId, chatType });

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Chat history retrived successfully",
        data: result
    });

});

export const updateHistoryController = {
    createChatHistory,
    findUserChat
}