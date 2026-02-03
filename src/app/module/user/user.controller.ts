import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.services";
import AppError from "../../utils/AppError";
import { User } from "./userModel";
import mongoose from "mongoose";
import { Project } from "../project/project.model";
import { sendNotification } from "../../config/sendNotification";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.email && !req.body.password) {
        throw new AppError(400, "email & password must be required");
    }

    const result = await userServices.registerUser(req.body);

    sendResponse(res, {
        success: true,
        message: "User registraction successfully",
        statusCode: 201,
        data: result,
    })
});

const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id;

    const result = await userServices.getSingleUser(userId as string);

    sendResponse(res, {
        success: true,
        message: "User info retrived successfully",
        statusCode: 200,
        data: result
    })
});

const userSettingInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.authUser._id;

    const result = await userServices.getSingleUserData(userId as string);

    sendResponse(res, {
        success: true,
        message: "User Setting info retrived successfully",
        statusCode: 200,
        data: result
    })
});

const userDeleted = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const deleteUser = await User.findOneAndDelete({ _id: userId });

    if (!deleteUser) {
        throw new AppError(400, "User not deleted");
    };

    res.status(200).json({ success: true, message: "User deleted success" });

});



const searchUserByEmail = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
        throw new AppError(400, "Email must be required");
    }

    const user = await User.find({ email: { $regex: new RegExp(email, "i") } });

    if (!user) {
        throw new AppError(400, "User not found");
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User found successfully.",
        data: user,
    });
});



const addSharedUser = catchAsync(async (req: Request, res: Response) => {
    const { userId, projectId } = req.body;

    // ✅ Validation
    if (
        !mongoose.Types.ObjectId.isValid(projectId as string) ||
        !mongoose.Types.ObjectId.isValid(userId)
    ) {
        throw new AppError(400, "Invalid project ID or user ID.");
    }

    // ✅ Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
        throw new AppError(404, "Project not found.");
    }

    // ✅ Check if user already added
    const alreadyShared = project.sharedWith.some(
        (u: any) => u.userId.toString() === userId
    );
    if (alreadyShared) {
        throw new AppError(400, "This user already has access to this project.");
    }

    // ✅ Add new shared user
    project.sharedWith.push({
        userId,
        role: "viewer",
    });

    await project.save();

    // 🔔 Send notification
    await sendNotification(
        userId,
        "New Project Access Granted 🎉",
        "Congratulations! You’ve been added to a new project. Check it out now!"
    );

    // ✅ Response
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User successfully added to the project's shared list.",
        data: project,
    });
});

const getUserSharedProjectsFull = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError(400, "Invalid or missing user ID.");
    }

    const allProjects = await Project.find().populate("userId sharedWith.userId");


    const sharedProjects = allProjects.filter(project =>
        project.sharedWith.some(u => u.userId && u.userId._id.toString() === userId)
    );

    const result = sharedProjects.map(project => {
        const isShared = project.sharedWith.some(u => u.userId && u.userId._id.toString() === userId);
        return {
            projectId: project._id,
            goal: project.goal,
            isShared,
            totalSharedUsers: project.sharedWith.length,
            projectData: project,
        };
    });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `Found ${result.length} project(s) shared with this user.`,
        data: {
            totalSharedProjects: result.length,
            projects: result,
        },
    });
});

const userChatAccessLimite = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne(
            { _id: userId, isDeleted: false },
            {
                username: 1,
                subscriptionTypeDate: 1,
                askLimite: 1,
                createLimite: 1,
                _id: 1
            }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}

export const userController = {
    registerUser,
    getSingleUser,
    userSettingInfo,
    userDeleted,
    searchUserByEmail,
    addSharedUser,
    getUserSharedProjectsFull,
    userChatAccessLimite
}