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

export enum EfontDensity {
    compact = "compact",
    comfortable = "comfortable"
}

const Appearance = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to User model
        required: true,
    },
    theme: {
        type: String,
        enum: [...Object.values(Etheme)],
        default: Etheme.System,
    },
    fontSize: {
        type: String,
        enum: [...Object.values(EfontSize)],
        default: EfontSize.Medium,
    },
    fontDensity: {
        type: String,
        enum: ["compact", "comfortable"],
        default: EfontDensity.compact,
    },
} , {timestamps : true , versionKey : false});

export const AppearanceModel = mongoose.model("appearance", Appearance);
