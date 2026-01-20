import { Request, Response } from "express";
import { UpdateChatHestory } from "./ProjectChatModel";

export const createUpdateHistoryController = async (req: Request, res: Response) => {
    try {

        const { userId, projectOrTaskId, isAi, text, chatType } = req.body;


        if (!userId || !projectOrTaskId || isAi === undefined || !text || !chatType) {
            return res.status(400).json({ message: 'All fields (userId, projectOrTaskId, isAi, text, chatType) are required!' });
        }

        const newUpdateHistory = new UpdateChatHestory({
            userId,
            projectOrTaskId,
            isAi,
            text,
            chatType: chatType
        });

        const savedUpdateHistory = await newUpdateHistory.save();

        res.status(201).json({
            message: 'Update history created successfully!',
            updateHistory: savedUpdateHistory,
        });
    } catch (error) {
        console.error('Error creating update history:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};



export const getUpdateHistoryController = async (req: Request, res: Response) => {
    try {
        const { userId, projectOrTaskId, chatType } = req.params;

        if (!userId || !projectOrTaskId || !chatType) {
            return res.status(400).json({ message: 'userId, projectOrTaskId and chatType are required!' });
        }

        const updateHistory = await UpdateChatHestory.find({
            userId: userId,
            projectOrTaskId: projectOrTaskId,
            chatType: chatType
        });

        if (updateHistory.length === 0) {
            return res.status(404).json({ message: 'No update history found for the given user and project/task!' });
        }

        res.status(200).json({
            message: 'Update history fetched successfully!',
            updateHistory
        });
    } catch (error) {
        console.error('Error fetching update history:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};



export const deleteMultipleUpdateHistoryController = async (req: Request, res: Response) => {
    try {
        const { userId, projectOrTaskId, chatType } = req.params;

        if (!userId || !projectOrTaskId || !chatType) {
            return res.status(400).json({ message: 'Both userId, projectOrTaskId and chatType are required!' });
        }

        const result = await UpdateChatHestory.deleteMany({
            userId: userId,
            projectOrTaskId: projectOrTaskId,
            chatType: chatType
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No update history records found for the given user and project/task!' });
        };
        
        res.status(200).json({
            message: `${result.deletedCount} update history records deleted successfully!`
        });
    } catch (error) {
        console.error('Error deleting update history records:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};