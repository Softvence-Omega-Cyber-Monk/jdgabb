import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import { AiChatModel } from "../setting/aiChat/aiChat.model";
import { AppearanceModel } from "../setting/appearance/appearance.model";
import { CollaborationModel } from "../setting/collaboration/collaboration.model";
import { languageModel } from "../setting/language/language.model";
import { NotificationModel } from "../setting/notifications/notifications.model";
import { PrivacyModel } from "../setting/privacy/privacy.model";
import { ProductivityEnhancements } from "../setting/Productivity/productivity.model";
import { ProjectTaskModel } from "../setting/projectTask/projectTask.model";
import { IAuthprovider, IUser } from "./user.interface";
import { User } from "./userModel";


const registerUser = async (payload: Partial<IUser>) => {

    const session = await User.startSession();
    session.startTransaction();

    try {
        const existUser = await User.findOne({ email: payload.email }).session(session);

        if (existUser) {
            throw new AppError(400, "User already exists");
        }

        const authProvider: IAuthprovider = { providerId: payload?.email as string, provider: "Credentials" };

        const result = await User.create([{ ...payload, auths: [authProvider] }], { session });

        if (!result || result.length === 0) {
            throw new Error("Failed to create user");
        }

        const userId = result[0]?._id;


        await AiChatModel.create([{ userId }], { session });
        await AppearanceModel.create([{ userId }], { session });
        await CollaborationModel.create([{ userId }], { session });
        await languageModel.create([{ userId }], { session });
        await NotificationModel.create([{ userId }], { session });
        await PrivacyModel.create([{ userId }], { session });
        await ProductivityEnhancements.create([{ userId }], { session });
        await ProjectTaskModel.create([{ userId }], { session });

        await session.commitTransaction();
        session.endSession();

        return result[0];

    } catch (error: any) {

        await session.abortTransaction();
        session.endSession();

        console.log("User registration failed", error.message);
        throw new AppError(500, "User registration failed: " + error.message);
    }
};


const getSingleUser = async (id: string) => {
    const result = User.findById(id);
    return result;
};


const getSingleUserData = async (id: string) => {
    const result = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
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
    return result
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


export const userServices = {
    registerUser,
    getSingleUser,
    getSingleUserData
};