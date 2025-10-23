import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { HistoryChatModel } from "./history.model";
import mongoose from "mongoose";



const getAllHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const staticMessage = `Great! Type into the chat bar below what sort of project you want to start. We can think of an idea together - do you want to be healthier, start a business, find love, find your passion, save time, or speed through your homework? What's a goal you have? It can be anything!`;

    const userId = req.params.id;

    const result = await HistoryChatModel.findOne({ userId: userId });

    res.status(200).json({
        statucMessage: staticMessage,
        userChatHistory: result
    });
});



const addUserChatToHistory = async (req: Request, res: Response) => {
    try {
        const { userId, user } = req.body;


        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId must be required",
            });
        }
        const objectUserId = new mongoose.Types.ObjectId(userId);

        const existingHistory = await HistoryChatModel.findOne({ userId: objectUserId });

        if (!existingHistory) {
            return res.status(404).json({
                success: false,
                message: "User history not found",
            });
        }

        existingHistory.history.push({
            user,
            timeStamp: new Date(),
        });


        await existingHistory.save();


        res.status(200).json({
            success: true,
            message: "Chat added successfully",
            data: existingHistory,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


const addAIChatToHistory = async (req: Request, res: Response) => {
    try {
        const { userId, historyId, ai } = req.body;

        if (!userId || !historyId || !ai) {
            return res.status(400).json({
                success: false,
                message: "userId, historyId & AI message must be required",
            });
        }


        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(historyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId or historyId",
            });
        }

        const objectUserId = new mongoose.Types.ObjectId(userId);
        const objectHistoryId = new mongoose.Types.ObjectId(historyId);

        const updatedHistory = await HistoryChatModel.findOneAndUpdate(
            { userId: objectUserId, "history._id": objectHistoryId },
            { $set: { "history.$.ai": ai } },
            { new: true }
        );

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

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



export const historyController = {
    getAllHistory,
    addUserChatToHistory,
    addAIChatToHistory
}