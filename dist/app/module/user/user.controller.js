"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const user_services_1 = require("./user.services");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const userModel_1 = require("./userModel");
const mongoose_1 = __importDefault(require("mongoose"));
const project_model_1 = require("../project/project.model");
const sendNotification_1 = require("../../config/sendNotification");
const registerUser = (0, catchAsync_1.default)(async (req, res, next) => {
    if (!req.body.email && !req.body.password) {
        throw new AppError_1.default(400, "email & password must be required");
    }
    const result = await user_services_1.userServices.registerUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User registraction successfully",
        statusCode: 201,
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.id;
    const result = await user_services_1.userServices.getSingleUser(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User info retrived successfully",
        statusCode: 200,
        data: result
    });
});
const userSettingInfo = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser._id;
    const result = await user_services_1.userServices.getSingleUserData(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User Setting info retrived successfully",
        statusCode: 200,
        data: result
    });
});
const userDeleted = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.id;
    const deleteUser = await userModel_1.User.findOneAndDelete({ _id: userId });
    if (!deleteUser) {
        throw new AppError_1.default(400, "User not deleted");
    }
    ;
    res.status(200).json({ success: true, message: "User deleted success" });
});
const searchUserByEmail = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.query;
    if (!email || typeof email !== "string") {
        throw new AppError_1.default(400, "Email must be required");
    }
    const user = await userModel_1.User.find({ email: { $regex: new RegExp(email, "i") } });
    if (!user) {
        throw new AppError_1.default(400, "User not found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User found successfully.",
        data: user,
    });
});
const addSharedUser = (0, catchAsync_1.default)(async (req, res) => {
    const { userId, projectId } = req.body;
    // ✅ Validation
    if (!mongoose_1.default.Types.ObjectId.isValid(projectId) ||
        !mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(400, "Invalid project ID or user ID.");
    }
    // ✅ Check if project exists
    const project = await project_model_1.Project.findById(projectId);
    if (!project) {
        throw new AppError_1.default(404, "Project not found.");
    }
    // ✅ Check if user already added
    const alreadyShared = project.sharedWith.some((u) => u.userId.toString() === userId);
    if (alreadyShared) {
        throw new AppError_1.default(400, "This user already has access to this project.");
    }
    // ✅ Add new shared user
    project.sharedWith.push({
        userId,
        role: "viewer",
    });
    await project.save();
    // 🔔 Send notification
    await (0, sendNotification_1.sendNotification)(userId, "New Project Access Granted 🎉", "Congratulations! You’ve been added to a new project. Check it out now!");
    // ✅ Response
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User successfully added to the project's shared list.",
        data: project,
    });
});
const getUserSharedProjectsFull = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(400, "Invalid or missing user ID.");
    }
    const allProjects = await project_model_1.Project.find().populate("userId sharedWith.userId");
    const sharedProjects = allProjects.filter(project => project.sharedWith.some(u => u.userId && u.userId._id.toString() === userId));
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
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: `Found ${result.length} project(s) shared with this user.`,
        data: {
            totalSharedProjects: result.length,
            projects: result,
        },
    });
});
const userChatAccessLimite = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel_1.User.findOne({ _id: userId, isDeleted: false }, {
            username: 1,
            subscriptionTypeDate: 1,
            askLimite: 1,
            createLimite: 1,
            _id: 1
        });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
};
exports.userController = {
    registerUser,
    getSingleUser,
    userSettingInfo,
    userDeleted,
    searchUserByEmail,
    addSharedUser,
    getUserSharedProjectsFull,
    userChatAccessLimite
};
//# sourceMappingURL=user.controller.js.map