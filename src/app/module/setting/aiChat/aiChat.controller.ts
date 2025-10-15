import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { aiChatServices } from "./aiChat.services";
import { sendResponse } from "../../../utils/sendResponse";


const getAiChatByUserId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await aiChatServices.getAiChatByUserId(id as string);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "AiChat retrived success",
        data: result
    })
});

const updateAiChat = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await aiChatServices.updateAiChatByUserID(id as string, updatedData as any);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Updated success",
        data: result
    })
});

export const chatController = {
    getAiChatByUserId,
    updateAiChat
}