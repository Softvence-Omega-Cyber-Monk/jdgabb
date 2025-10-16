import mongoose from "mongoose";
export declare enum ErecurringTask {
    Daily = "Daily",
    Weekly = "Weekly",
    CustomInterval = "Custom interval"
}
export declare const ProjectTaskModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    defaultDueDate: boolean;
    priorityLevel: boolean;
    tagsLabels: boolean;
    assigneeMode: boolean;
    recurringTask: ErecurringTask;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    defaultDueDate: boolean;
    priorityLevel: boolean;
    tagsLabels: boolean;
    assigneeMode: boolean;
    recurringTask: ErecurringTask;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    defaultDueDate: boolean;
    priorityLevel: boolean;
    tagsLabels: boolean;
    assigneeMode: boolean;
    recurringTask: ErecurringTask;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    defaultDueDate: boolean;
    priorityLevel: boolean;
    tagsLabels: boolean;
    assigneeMode: boolean;
    recurringTask: ErecurringTask;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    defaultDueDate: boolean;
    priorityLevel: boolean;
    tagsLabels: boolean;
    assigneeMode: boolean;
    recurringTask: ErecurringTask;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    defaultDueDate: boolean;
    priorityLevel: boolean;
    tagsLabels: boolean;
    assigneeMode: boolean;
    recurringTask: ErecurringTask;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=projectTask.model.d.ts.map