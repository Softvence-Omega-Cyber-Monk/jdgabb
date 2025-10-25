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
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover",
});
const createPaymentSession = (0, catchAsync_1.default)(async (req, res, next) => {
    const payload = {
        ...req.body,
        userId: req.authUser?._id,
        email: req.authUser?.email
    };
    const result = await payment_services_1.paymentService.checkout(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "wait for redirect..",
        data: result
    });
});
const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    // 1️⃣ Verify webhook signature
    try {
        event = stripe.webhooks.constructEvent(req.body, // Raw body, ensure the middleware is set to handle raw body (as explained earlier)
        sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("✅ Webhook received:", event.type);
    }
    catch (err) {
        console.error("❌ Webhook verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // 2️⃣ Handle Stripe events
    try {
        const session = event.data.object;
        switch (event.type) {
            case 'checkout.session.completed':
                // Payment successful
                console.log('Payment successful for session:', session.id);
                // Optional: Save payment information to MongoDB
                const userId = session?.metadata?.userId; // Extract the userId from metadata
                const payment = await payment_model_1.Payment.create({
                    userId: new mongoose_1.Types.ObjectId(userId),
                    stripeSessionId: session.id,
                    amount: session?.amount_total / 100, // Convert back to dollars
                    status: 'PAID', // Mark as paid
                    paymentType: 'PROMPT', // Payment type if necessary
                });
                console.log('Payment information saved to database:', payment);
                break;
            case 'checkout.session.async_payment_failed':
                // Handle failed payments
                console.log('Async payment failed for session:', session.id);
                break;
            case 'checkout.session.expired':
                // Handle expired sessions
                console.log('Session expired for session:', session.id);
                break;
            default:
                console.log("ℹ️ Unhandled Stripe event:", event.type);
        }
        // Respond with a 200 status to acknowledge receipt of the event
        return res.status(200).send("Event processed");
    }
    catch (err) {
        console.error("Error handling webhook event:", err.message);
        return res.status(400).send(`Error handling event: ${err.message}`);
    }
};
exports.PaymentController = {
    createPaymentSession,
    stripeWebhook
};
//# sourceMappingURL=payment.controller.js.map