import mongoose from "mongoose";

export enum Etheme {
    System = "System",
    Light = "Light",
    Dark = "Dark"
};

export enum EfontSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
    ExtraLarge = "Extra large"
};

export enum EDateFormate {
    compact = "compact",
    comfortable = "comfortable"
}

const language = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to User model
        required: true,
    },
    uiLanguage: {
        type: String,
        default: "English"
    },
    dateformat: {
        type: String,
        enum: ["MM/ DD/ YYYY", "DD /MM / YYYY"],
        default: "MM/ DD/ YYYY"
    },
    timeFormate : {
        type : String,
        enum : ["12 hours" , "24 hours"],
        default : "12 hours"
    }
} , {timestamps : true , versionKey : false});

export const languageModel = mongoose.model("language", language);
