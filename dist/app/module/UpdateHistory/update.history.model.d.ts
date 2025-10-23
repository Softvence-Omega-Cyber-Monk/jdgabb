import mongoose from "mongoose";
export declare const UpdateChatHestory: mongoose.Model<{
    text: string;
    userId: mongoose.Types.ObjectId;
    isFile: boolean;
    createDate: NativeDate;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    text: string;
    userId: mongoose.Types.ObjectId;
    isFile: boolean;
    createDate: NativeDate;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    text: string;
    userId: mongoose.Types.ObjectId;
    isFile: boolean;
    createDate: NativeDate;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    text: string;
    userId: mongoose.Types.ObjectId;
    isFile: boolean;
    createDate: NativeDate;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    text: string;
    userId: mongoose.Types.ObjectId;
    isFile: boolean;
    createDate: NativeDate;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    text: string;
    userId: mongoose.Types.ObjectId;
    isFile: boolean;
    createDate: NativeDate;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=update.history.model.d.ts.map