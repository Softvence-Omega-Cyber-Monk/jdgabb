"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const checkout = async (data) => {
    const { userId, email, amount, paymentType } = data;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: email,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: paymentType === "PROMPT" ? "AI Prompt Credits" : "AI Subscription Plan",
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            },
        ],
        // api/v1/payment/success?session_id={CHECKOUT_SESSION_ID}
        // /api/v1/payment/cancel`
        // success_url: `${envVers.SERVER_URL}/api/v1/payment/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `${envVers.SERVER_URL}/api/v1/payment/payment/cancel`,
        success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
        metadata: {
            userId: userId.toString(),
            paymentType,
        },
    });
    return {
        success: true,
        url: session.url,
        sessionId: session.id // ✅ send back to controller
    };
};
exports.paymentService = { checkout };
//# sourceMappingURL=payment.services.js.map