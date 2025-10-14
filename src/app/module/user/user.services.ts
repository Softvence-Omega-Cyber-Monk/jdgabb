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

        const authProvider: IAuthprovider = { prividerId: payload?.email as string, provider: "Credentials" };

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


export const userServices = {
    registerUser
};