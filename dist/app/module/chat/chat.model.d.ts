import mongoose from "mongoose";
export declare const Chat: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    chat: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    plan: "free" | "pro" | "premium";
    promptLimit: number;
    planExpireAt: NativeDate;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    chat: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    plan: "free" | "pro" | "premium";
    promptLimit: number;
    planExpireAt: NativeDate;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    chat: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    plan: "free" | "pro" | "premium";
    promptLimit: number;
    planExpireAt: NativeDate;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    chat: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    plan: "free" | "pro" | "premium";
    promptLimit: number;
    planExpireAt: NativeDate;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    chat: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    plan: "free" | "pro" | "premium";
    promptLimit: number;
    planExpireAt: NativeDate;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    chat: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    plan: "free" | "pro" | "premium";
    promptLimit: number;
    planExpireAt: NativeDate;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=chat.model.d.ts.map