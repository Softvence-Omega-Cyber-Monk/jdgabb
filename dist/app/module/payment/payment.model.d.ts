import mongoose from "mongoose";
export declare enum EPaymentStatus {
    PAID = "PURCHASE",
    RENEWE = "RENEWE",
    CANCEL = "CANCEL",
    UNPAID = "UNPAID"
}
export declare enum EPaymentType {
    RENEWE = "RENEWE",
    PURCHASE = "PURCHASE"
}
export declare const Payment: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    paymentStauts: EPaymentStatus;
    amount: number;
    planType?: EPaymentType | null;
    subExpireDate?: NativeDate | null;
    eventTrigerDate?: NativeDate | null;
    purchasedSubscriptionDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    paymentStauts: EPaymentStatus;
    amount: number;
    planType?: EPaymentType | null;
    subExpireDate?: NativeDate | null;
    eventTrigerDate?: NativeDate | null;
    purchasedSubscriptionDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    paymentStauts: EPaymentStatus;
    amount: number;
    planType?: EPaymentType | null;
    subExpireDate?: NativeDate | null;
    eventTrigerDate?: NativeDate | null;
    purchasedSubscriptionDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    paymentStauts: EPaymentStatus;
    amount: number;
    planType?: EPaymentType | null;
    subExpireDate?: NativeDate | null;
    eventTrigerDate?: NativeDate | null;
    purchasedSubscriptionDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    paymentStauts: EPaymentStatus;
    amount: number;
    planType?: EPaymentType | null;
    subExpireDate?: NativeDate | null;
    eventTrigerDate?: NativeDate | null;
    purchasedSubscriptionDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    paymentStauts: EPaymentStatus;
    amount: number;
    planType?: EPaymentType | null;
    subExpireDate?: NativeDate | null;
    eventTrigerDate?: NativeDate | null;
    purchasedSubscriptionDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=payment.model.d.ts.map