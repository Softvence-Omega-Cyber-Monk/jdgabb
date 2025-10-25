"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = exports.stripeWebhook = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const payment_services_1 = require("./payment.services");
const stripe_1 = __importDefault(require("stripe"));
const payment_model_1 = require("./payment.model");
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
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!sig || !endpointSecret) {
        return res.status(400).send("Missing signature or webhook secret");
    }
    let event;
    try {
        // ⚡ Important: pass raw body (Buffer) for verification
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;
                await payment_model_1.Payment.findOneAndUpdate({ stripeSessionId: session.id }, { status: "PAID" });
                console.log("✅ Payment succeeded for session:", session.id);
                break;
            case "checkout.session.expired":
            case "checkout.session.async_payment_failed":
                const failedSession = event.data.object;
                await payment_model_1.Payment.findOneAndUpdate({ stripeSessionId: failedSession.id }, { status: "CANCEL" });
                console.log("❌ Payment failed or expired:", failedSession.id);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        res.status(200).send("Received"); // Must return 200
    }
    catch (error) {
        console.error("Error handling event:", error);
        res.status(500).send("Internal server error");
    }
};
exports.stripeWebhook = stripeWebhook;
exports.PaymentController = {
    createPaymentSession,
    stripeWebhook: exports.stripeWebhook
};
//# sourceMappingURL=payment.controller.js.map