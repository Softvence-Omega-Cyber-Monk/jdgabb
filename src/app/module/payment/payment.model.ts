import mongoose, { Schema } from "mongoose";

export enum EPaymentStatus {
    PAID = "PURCHASE",
    RENEWE = "RENEWE",
    CANCEL = "CANCEL",
    UNPAID = "UNPAID",
};

export enum EPaymentType {
    RENEWE = "RENEWE",
    PURCHASE = "PURCHASE"
}

const paymentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    app_user_id: {
        type: String,
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
    planType: {
        type: String,
        enum: [...Object.values(EPaymentType)]
    }

}, {
    timestamps: true,
    versionKey: false
});


export const Payment = mongoose.model("payment", paymentSchema);