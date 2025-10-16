import mongoose from "mongoose";
export declare const NotificationModel: mongoose.Model<{
    push: boolean;
    userId: mongoose.Types.ObjectId;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    push: boolean;
    userId: mongoose.Types.ObjectId;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    push: boolean;
    userId: mongoose.Types.ObjectId;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    push: boolean;
    userId: mongoose.Types.ObjectId;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    push: boolean;
    userId: mongoose.Types.ObjectId;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    push: boolean;
    userId: mongoose.Types.ObjectId;
    inAppReminder: boolean;
    smart: boolean;
    snoozeOptions: number[];
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=notifications.model.d.ts.map