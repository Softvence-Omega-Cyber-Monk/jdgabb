import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { protectUser } from "../../middleware/protect";
import { Role } from "../user/user.interface";
import Stripe from "stripe";

const PaymentRoute = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

PaymentRoute.post('/checkout', protectUser(Role.USER), PaymentController.createPaymentSession)


PaymentRoute.get("/payment/success", async (req, res) => {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id as string);

    if (session.payment_status === "paid") {
        // ✅ success handle
        return res.status(200).json({ message: "payment Success" });
    }

    res.status(400).json({ message: "payment faild" });
});
PaymentRoute.get("/payment/cancel", async (req, res) => {

    res.status(400).json({ message: "payment cancel" });
});

PaymentRoute.get("/getAllPayment/:id" , PaymentController.getAllPayment);

export default PaymentRoute;