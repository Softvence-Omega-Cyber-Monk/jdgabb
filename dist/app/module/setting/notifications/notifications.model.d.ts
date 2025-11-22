import mongoose from "mongoose";
export declare const NotificationModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    push: boolean;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    push: boolean;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    push: boolean;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    push: boolean;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    push: boolean;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    push: boolean;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=notifications.model.d.ts.map