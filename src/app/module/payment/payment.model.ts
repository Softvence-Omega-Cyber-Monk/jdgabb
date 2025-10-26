import mongoose, { Schema } from "mongoose";

export enum EPaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
    CANCEL = "CANCEL"
};

export enum EPaymentType {
    PROMPT = "PROMPT",
    SUBSCRIPTION = "SUBSCRIPTION"
}

const paymentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    sessionId: {
        type: String,
        unique: true,
        required: true
    },
    paymentStauts: {
        type: String,
        enum: [...Object.values(EPaymentStatus)],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: [...Object.values(EPaymentType)]
    }

}, {
    timestamps: true,
    versionKey: false
});


export const Payment = mongoose.model("payment", paymentSchema);