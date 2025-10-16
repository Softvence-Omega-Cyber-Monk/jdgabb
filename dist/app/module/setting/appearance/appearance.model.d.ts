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
export declare enum EfontDensity {
    compact = "compact",
    comfortable = "comfortable"
}
export declare const AppearanceModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    theme: Etheme;
    fontSize: EfontSize;
    fontDensity: "compact" | "comfortable";
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    theme: Etheme;
    fontSize: EfontSize;
    fontDensity: "compact" | "comfortable";
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    theme: Etheme;
    fontSize: EfontSize;
    fontDensity: "compact" | "comfortable";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    theme: Etheme;
    fontSize: EfontSize;
    fontDensity: "compact" | "comfortable";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    theme: Etheme;
    fontSize: EfontSize;
    fontDensity: "compact" | "comfortable";
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    theme: Etheme;
    fontSize: EfontSize;
    fontDensity: "compact" | "comfortable";
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=appearance.model.d.ts.map