import { Request, Response } from "express";
import { UpdateChatHestory } from "./ProjectChatModel";

export const createUpdateHistoryController = async (req: Request, res: Response) => {
    try {

        const { userId, projectOrTaskId, isAi, text } = req.body;


        if (!userId || !projectOrTaskId || isAi === undefined || !text) {
            return res.status(400).json({ message: 'All fields (userId, projectOrTaskId, isAi, text) are required!' });
        }

        const newUpdateHistory = new UpdateChatHestory({
            userId,
            projectOrTaskId,
            isAi,
            text
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
        const { userId, projectOrTaskId } = req.params;

        if (!userId || !projectOrTaskId) {
            return res.status(400).json({ message: 'userId and projectOrTaskId are required!' });
        }

        const updateHistory = await UpdateChatHestory.find({
            userId: userId,
            projectOrTaskId: projectOrTaskId
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
        // Extract userId and projectOrTaskId from query parameters
        const { userId, projectOrTaskId } = req.params;

        // Validate if both userId and projectOrTaskId are provided
        if (!userId || !projectOrTaskId) {
            return res.status(400).json({ message: 'Both userId and projectOrTaskId are required!' });
        }

        // Delete the update history records based on the userId and projectOrTaskId
        const result = await UpdateChatHestory.deleteMany({
            userId: userId,
            projectOrTaskId: projectOrTaskId
        });

        // If no records were deleted, return a message saying no records were found
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No update history records found for the given user and project/task!' });
        }

        // Return success response
        res.status(200).json({
            message: `${result.deletedCount} update history records deleted successfully!`
        });
    } catch (error) {
        console.error('Error deleting update history records:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};