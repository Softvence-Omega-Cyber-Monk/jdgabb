import mongoose from "mongoose";
export declare enum Etheme {
    System = "System",
    Light = "Light",
    Dark = "Dark"
}
export declare enum EfontSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
    ExtraLarge = "Extra large"
}
export declare enum EDateFormate {
    compact = "compact",
    comfortable = "comfortable"
}
export declare const languageModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    uiLanguage: string;
    dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
    timeFormate: "12 hours" | "24 hours";
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    uiLanguage: string;
    dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
    timeFormate: "12 hours" | "24 hours";
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    uiLanguage: string;
    dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
    timeFormate: "12 hours" | "24 hours";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    uiLanguage: string;
    dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
    timeFormate: "12 hours" | "24 hours";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    uiLanguage: string;
    dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
    timeFormate: "12 hours" | "24 hours";
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    uiLanguage: string;
    dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
    timeFormate: "12 hours" | "24 hours";
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=language.model.d.ts.map