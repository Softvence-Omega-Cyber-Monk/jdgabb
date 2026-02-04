import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UpdateChatHestory } from "./update.history.model";
import AppError from "../../utils/AppError";
import { User } from "../user/userModel";


const createChatHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId, text, isAi, chatType } = req.body;
    const result = await UpdateChatHestory.create({ userId: userId, text: text, isAi, chatType });


    const findUser = await User.findOne({ _id: userId });

    if (!findUser) {
        throw new AppError(404, "User Not Found")
    }

    if (findUser.role === "USER") {
        if (isAi) {
            const currentDate = new Date();

            if (
                findUser.subscriptionExpireDate &&
                findUser.subscriptionExpireDate > currentDate
            ) {
                // subscription active → limit kombe na
            } else {

                if (chatType === "ask") {
                    if (findUser.askLimite <= 0) {
                        throw new AppError(403, "AI ask limit sesh. Please upgrade")
                    }
                    findUser.askLimite -= 1;
                    await findUser.save();
                }

                if (chatType === "create") {
                    if (findUser.createLimite <= 0) {
                        throw new AppError(403, "AI create limit sesh. Please upgrade.")
                    }
                    findUser.createLimite -= 1;
                    await findUser.save();
                }

            }
        }
    }

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


const deleteUserChat = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { userId, chatType } = req.params;

    const result = await UpdateChatHestory.deleteMany({
        userId: userId,
        chatType: chatType
    });

    if (!result) throw new AppError(400, "User Not Found");

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Chat Deleted Sucessfully",
        data: null
    })

})

export const updateHistoryController = {
    createChatHistory,
    findUserChat,
    deleteUserChat
}