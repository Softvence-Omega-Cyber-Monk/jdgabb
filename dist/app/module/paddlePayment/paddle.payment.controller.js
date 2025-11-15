"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaddleCheckout = void 0;
const paddle_node_sdk_1 = require("@paddle/paddle-node-sdk");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const env_1 = require("../../config/env");
const paddle = new paddle_node_sdk_1.Paddle(env_1.envVers.PADDLE_API_KEY, {
    environment: paddle_node_sdk_1.Environment.sandbox,
    logLevel: paddle_node_sdk_1.LogLevel.verbose,
});
// ✅ Create Checkout Controller
exports.createPaddleCheckout = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.authUser?._id;
    const email = req.authUser?.email;
    const { amount, paymentType } = req.body;
    const priceId = paymentType === "PROMPT"
        ? "pri_01k9y8214mmhqs97xq5et8j4z4"
        : "pri_01k9y7xnjckvvfdc071ts4kr30";
    try {
        const checkout = await paddle.checkout.create({
            customer_email: email,
            product_id: priceId,
            quantity: 1,
            passthrough: JSON.stringify({
                userId,
                paymentType,
                amount,
            }),
            return_url: "https://yourapp.com/payment-success",
            cancel_url: "https://yourapp.com/payment-cancel",
        });
        res.status(200).json({
            success: true,
            message: "Paddle checkout created successfully",
            data: {
                checkout_url: checkout.response?.url,
                checkout_id: checkout.response?.checkout_id,
            },
        });
    }
    catch (error) {
        console.error("❌ Paddle checkout error:", error);
        res.status(400).json({
            success: false,
            message: "Failed to create Paddle checkout",
            error: error.message,
        });
    }
});
//# sourceMappingURL=paddle.payment.controller.js.map