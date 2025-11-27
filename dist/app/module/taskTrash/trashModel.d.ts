import mongoose from "mongoose";
export declare const TaskTrushModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=trashModel.d.ts.map