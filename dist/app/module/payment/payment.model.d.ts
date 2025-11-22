import mongoose from "mongoose";
export declare enum EPaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
    CANCEL = "CANCEL"
}
export declare enum EPaymentType {
    PROMPT = "PROMPT",
    SUBSCRIPTION = "SUBSCRIPTION"
}
export declare const Payment: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    sessionId: string;
    paymentStauts: EPaymentStatus;
    amount: number;
    paymentType?: EPaymentType | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    sessionId: string;
    paymentStauts: EPaymentStatus;
    amount: number;
    paymentType?: EPaymentType | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    sessionId: string;
    paymentStauts: EPaymentStatus;
    amount: number;
    paymentType?: EPaymentType | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    sessionId: string;
    paymentStauts: EPaymentStatus;
    amount: number;
    paymentType?: EPaymentType | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    sessionId: string;
    paymentStauts: EPaymentStatus;
    amount: number;
    paymentType?: EPaymentType | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    sessionId: string;
    paymentStauts: EPaymentStatus;
    amount: number;
    paymentType?: EPaymentType | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=payment.model.d.ts.map