import mongoose from "mongoose";
export declare const FirebaseNotificationModel: mongoose.Model<{
    body: string;
    title: string;
    userId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    isRead: boolean;
    userProfile?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    body: string;
    title: string;
    userId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    isRead: boolean;
    userProfile?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    body: string;
    title: string;
    userId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    isRead: boolean;
    userProfile?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    body: string;
    title: string;
    userId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    isRead: boolean;
    userProfile?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    body: string;
    title: string;
    userId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    isRead: boolean;
    userProfile?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    body: string;
    title: string;
    userId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    isRead: boolean;
    userProfile?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=firebaseNotifacation.mode;.d.ts.map