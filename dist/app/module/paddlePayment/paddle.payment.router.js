"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protect_1 = require("../../middleware/protect");
const paddle_payment_controller_1 = require("./paddle.payment.controller");
const paddlePaymentRouter = (0, express_1.Router)();
// Create checkout session (protected route)
paddlePaymentRouter.post("/paddle_checkout", (0, protect_1.protectUser)(), paddle_payment_controller_1.createPaddleCheckout);
// Webhook endpoint (no auth needed - verified by signature)
// ⚠️ IMPORTANT: This must be accessible without authentication
// paddlePaymentRouter.post(
//   "/paddle_webhook",
//   handlePaddleWebhook
// );
// // Get transaction status (protected route - optional)
// paddlePaymentRouter.get(
//   "/transaction/:transactionId",
//   protectUser(),
//   getTransactionStatus
// );
exports.default = paddlePaymentRouter;
//# sourceMappingURL=paddle.payment.router.js.map