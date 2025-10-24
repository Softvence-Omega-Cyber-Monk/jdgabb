import mongoose from "mongoose";
export declare const PrivacyModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    autoDelete: "7d" | "30d" | "none" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    localStorage: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    autoDelete: "7d" | "30d" | "none" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    localStorage: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    autoDelete: "7d" | "30d" | "none" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    localStorage: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    autoDelete: "7d" | "30d" | "none" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    localStorage: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    autoDelete: "7d" | "30d" | "none" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    localStorage: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    autoDelete: "7d" | "30d" | "none" | "90d";
    deletionMethod: "archive" | "permanent";
    excludeFromAI: boolean;
    localStorage: boolean;
    cloudSync: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=privacy.model.d.ts.map