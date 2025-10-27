"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const protect_1 = require("../../middleware/protect");
const user_interface_1 = require("../user/user.interface");
const stripe_1 = __importDefault(require("stripe"));
const firebaseNotifacation_controller_1 = require("../firebaseNotification/firebaseNotifacation.controller");
const PaymentRoute = (0, express_1.Router)();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
PaymentRoute.get("/getAll/:id", firebaseNotifacation_controller_1.firebaseNotifacationController.getAllNtg);
PaymentRoute.patch("/markAsRead/:id", firebaseNotifacation_controller_1.firebaseNotifacationController.markAsRead);
PaymentRoute.post('/checkout', (0, protect_1.protectUser)(user_interface_1.Role.USER), payment_controller_1.PaymentController.createPaymentSession);
PaymentRoute.get("/payment/success", async (req, res) => {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === "paid") {
        // ✅ success handle
        return res.status(200).json({ message: "payment Success" });
    }
    res.status(400).json({ message: "payment faild" });
});
PaymentRoute.get("/payment/cancel", async (req, res) => {
    res.status(400).json({ message: "payment cancel" });
});
PaymentRoute.get("/getAllPayment/:id", payment_controller_1.PaymentController.getAllPayment);
exports.default = PaymentRoute;
//# sourceMappingURL=payment.route.js.map