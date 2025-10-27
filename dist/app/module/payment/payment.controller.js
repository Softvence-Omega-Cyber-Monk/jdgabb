"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const payment_services_1 = require("./payment.services");
const stripe_1 = __importDefault(require("stripe"));
const payment_model_1 = require("./payment.model");
const mongoose_1 = require("mongoose");
const userModel_1 = require("../user/userModel");
const sendNotification_1 = require("../../config/sendNotification");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover",
});
// ✅ 1️⃣ Create Stripe Checkout Session + UNPAID payment entry
// ✅ createPaymentSession
const createPaymentSession = (0, catchAsync_1.default)(async (req, res) => {
    const payload = {
        ...req.body,
        userId: req.authUser?._id,
        email: req.authUser?.email,
    };
    const result = await payment_services_1.paymentService.checkout(payload);
    if (!result || !result.sessionId) {
        throw new Error("Failed to create Stripe session");
    }
    await payment_model_1.Payment.create({
        userId: new mongoose_1.Types.ObjectId(payload.userId),
        sessionId: result.sessionId,
        amount: payload.amount,
        paymentType: payload.paymentType,
        paymentStauts: "UNPAID",
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "wait for redirect..",
        data: result,
    });
});
const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("✅ Webhook verified:", event.type);
    }
    catch (err) {
        console.error("❌ Webhook verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // ✅ Handle event types
    try {
        const session = event.data.object;
        if (event.type === "checkout.session.completed") {
            const sessionId = session.id;
            const userId = session.metadata?.userId;
            const paymentType = session.metadata?.paymentType || "PROMPT";
            const amount = session.amount_total / 100;
            // Update payment
            const updatedPayment = await payment_model_1.Payment.findOneAndUpdate({ sessionId }, { $set: { paymentStauts: "PAID" } }, { new: true });
            console.log("✅ Payment updated:", updatedPayment);
            // User update
            const user = await userModel_1.User.findById(userId);
            if (user) {
                if (paymentType === "PROMPT") {
                    user.chatLimit = (user.chatLimit || 0) + 300;
                    await (0, sendNotification_1.sendNotification)(String(user?._id), "New Notification", "prompt payment success");
                }
                else if (paymentType === "SUBSCRIPTION") {
                    const now = new Date();
                    let newExpiryDate;
                    if (user.subscriptionTypeDate && user.subscriptionTypeDate > now) {
                        // আগের date এখনও valid → আগের date + 7 দিন
                        newExpiryDate = new Date(user.subscriptionTypeDate);
                        newExpiryDate.setDate(newExpiryDate.getDate() + 7);
                    }
                    else {
                        // আগের date expired বা null → আজ থেকে +7 দিন
                        newExpiryDate = new Date(now);
                        newExpiryDate.setDate(newExpiryDate.getDate() + 7);
                    }
                    user.subscriptionTypeDate = newExpiryDate;
                    user.dayliChatLimit = 200;
                    await user.save();
                    console.log(`📅 Subscription extended till: ${user.subscriptionTypeDate}`);
                    await (0, sendNotification_1.sendNotification)(String(user?._id), "New Notification", "Subscription payment success");
                }
                await user.save();
            }
        }
        res.status(200).send("Event processed");
    }
    catch (err) {
        console.error("❌ Error processing event:", err.message);
        res.status(400).send(`Webhook error: ${err.message}`);
    }
};
const getAllPayment = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.id;
    const result = await payment_model_1.Payment.find({ userId: userId });
    res.status(200).send({ result });
});
exports.PaymentController = {
    createPaymentSession,
    stripeWebhook,
    getAllPayment
};
//# sourceMappingURL=payment.controller.js.map