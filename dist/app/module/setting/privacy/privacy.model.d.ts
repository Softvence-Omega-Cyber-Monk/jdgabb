import mongoose from "mongoose";
export declare const PrivacyModel: mongoose.Model<{
    localStorage: boolean;
    userId: mongoose.Types.ObjectId;
    autoDelete: "none" | "7d" | "30d" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    localStorage: boolean;
    userId: mongoose.Types.ObjectId;
    autoDelete: "none" | "7d" | "30d" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    localStorage: boolean;
    userId: mongoose.Types.ObjectId;
    autoDelete: "none" | "7d" | "30d" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    localStorage: boolean;
    userId: mongoose.Types.ObjectId;
    autoDelete: "none" | "7d" | "30d" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    localStorage: boolean;
    userId: mongoose.Types.ObjectId;
    autoDelete: "none" | "7d" | "30d" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    localStorage: boolean;
    userId: mongoose.Types.ObjectId;
    autoDelete: "none" | "7d" | "30d" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=privacy.model.d.ts.map