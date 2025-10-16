"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const aiChat_model_1 = require("../setting/aiChat/aiChat.model");
const appearance_model_1 = require("../setting/appearance/appearance.model");
const collaboration_model_1 = require("../setting/collaboration/collaboration.model");
const language_model_1 = require("../setting/language/language.model");
const notifications_model_1 = require("../setting/notifications/notifications.model");
const privacy_model_1 = require("../setting/privacy/privacy.model");
const productivity_model_1 = require("../setting/Productivity/productivity.model");
const projectTask_model_1 = require("../setting/projectTask/projectTask.model");
const userModel_1 = require("./userModel");
const registerUser = async (payload) => {
    const session = await userModel_1.User.startSession();
    session.startTransaction();
    try {
        const existUser = await userModel_1.User.findOne({ email: payload.email }).session(session);
        if (existUser) {
            throw new AppError_1.default(400, "User already exists");
        }
        const authProvider = { providerId: payload?.email, provider: "Credentials" };
        const result = await userModel_1.User.create([{ ...payload, auths: [authProvider] }], { session });
        if (!result || result.length === 0) {
            throw new Error("Failed to create user");
        }
        const userId = result[0]?._id;
        await aiChat_model_1.AiChatModel.create([{ userId }], { session });
        await appearance_model_1.AppearanceModel.create([{ userId }], { session });
        await collaboration_model_1.CollaborationModel.create([{ userId }], { session });
        await language_model_1.languageModel.create([{ userId }], { session });
        await notifications_model_1.NotificationModel.create([{ userId }], { session });
        await privacy_model_1.PrivacyModel.create([{ userId }], { session });
        await productivity_model_1.ProductivityEnhancements.create([{ userId }], { session });
        await projectTask_model_1.ProjectTaskModel.create([{ userId }], { session });
        await session.commitTransaction();
        session.endSession();
        return result[0];
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log("User registration failed", error.message);
        throw new AppError_1.default(500, "User registration failed: " + error.message);
    }
};
const getSingleUser = async (id) => {
    const result = userModel_1.User.findById(id);
    return result;
};
const getSingleUserData = async (id) => {
    const result = await userModel_1.User.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
        {
            $lookup: {
                from: "aiChats",
                localField: "_id",
                foreignField: "userId",
                as: "aiChat"
            }
        },
        { $unwind: { path: "$aiChat", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "appearances",
                localField: "_id",
                foreignField: "userId",
                as: "appearance"
            }
        },
        { $unwind: { path: "$appearance", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "collaborations",
                localField: "_id",
                foreignField: "userId",
                as: "collaboration"
            }
        },
        { $unwind: { path: "$collaboration", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "languages",
                localField: "_id",
                foreignField: "userId",
                as: "language"
            }
        },
        { $unwind: { path: "$language", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "notifications",
                localField: "_id",
                foreignField: "userId",
                as: "notification"
            }
        },
        { $unwind: { path: "$notification", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "privacys",
                localField: "_id",
                foreignField: "userId",
                as: "privacy"
            }
        },
        { $unwind: { path: "$privacy", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "productivitys",
                localField: "_id",
                foreignField: "userId",
                as: "productivity"
            }
        },
        { $unwind: { path: "$productivity", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "projectTasks",
                localField: "_id",
                foreignField: "userId",
                as: "projectTask"
            }
        },
        { $unwind: { path: "$projectTask", preserveNullAndEmptyArrays: true } }
    ]);
    return result;
};
// const getSingleUserData = async (id: string) => {
//     const result = await User.aggregate([
//         { $match: { _id: new mongoose.Types.ObjectId(id) } },
//         {
//             $lookup: { from: "aichats", localField: "_id", foreignField: "userId", as: "aiChat" }
//         },
//         { $unwind: { path: "$aiChat", preserveNullAndEmptyArrays: true } },
//         {
//             $lookup: { from: "appearances", localField: "_id", foreignField: "userId", as: "appearance" }
//         },
//         { $unwind: { path: "$appearance", preserveNullAndEmptyArrays: true } },
//         {
//             $lookup: { from: "collaborations", localField: "_id", foreignField: "userId", as: "collaboration" }
//         },
//         { $unwind: { path: "$collaboration", preserveNullAndEmptyArrays: true } },
//         {
//             $lookup: { from: "languages", localField: "_id", foreignField: "userId", as: "language" }
//         },
//         { $unwind: { path: "$language", preserveNullAndEmptyArrays: true } },
//         {
//             $lookup: { from: "notifications", localField: "_id", foreignField: "userId", as: "notification" }
//         },
//         { $unwind: { path: "$notification", preserveNullAndEmptyArrays: true } },
//         {
//             $lookup: { from: "privacies", localField: "_id", foreignField: "userId", as: "privacy" }
//         },
//         { $unwind: { path: "$privacy", preserveNullAndEmptyArrays: true } },
//         {
//             $lookup: { from: "productivityenhancements", localField: "_id", foreignField: "userId", as: "productivity" }
//         },
//         { $unwind: { path: "$productivity", preserveNullAndEmptyArrays: true } },
//         {
//             $lookup: { from: "projecttasks", localField: "_id", foreignField: "userId", as: "projectTask" }
//         },
//         { $unwind: { path: "$projectTask", preserveNullAndEmptyArrays: true } }
//     ]);
//     return result;
// };
exports.userServices = {
    registerUser,
    getSingleUser,
    getSingleUserData
};
//# sourceMappingURL=user.services.js.map