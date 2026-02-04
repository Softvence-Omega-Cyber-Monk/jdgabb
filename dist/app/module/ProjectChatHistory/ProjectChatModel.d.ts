import mongoose from "mongoose";
export declare const UpdateChatHestory: mongoose.Model<{
    text: string;
    userId: mongoose.Types.ObjectId;
    isAi: boolean;
    projectOrTaskId: mongoose.Types.ObjectId;
    chatType?: "ask" | "create" | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    text: string;
    userId: mongoose.Types.ObjectId;
    isAi: boolean;
    projectOrTaskId: mongoose.Types.ObjectId;
    chatType?: "ask" | "create" | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    text: string;
    userId: mongoose.Types.ObjectId;
    isAi: boolean;
    projectOrTaskId: mongoose.Types.ObjectId;
    chatType?: "ask" | "create" | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    text: string;
    userId: mongoose.Types.ObjectId;
    isAi: boolean;
    projectOrTaskId: mongoose.Types.ObjectId;
    chatType?: "ask" | "create" | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    text: string;
    userId: mongoose.Types.ObjectId;
    isAi: boolean;
    projectOrTaskId: mongoose.Types.ObjectId;
    chatType?: "ask" | "create" | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    text: string;
    userId: mongoose.Types.ObjectId;
    isAi: boolean;
    projectOrTaskId: mongoose.Types.ObjectId;
    chatType?: "ask" | "create" | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=ProjectChatModel.d.ts.map