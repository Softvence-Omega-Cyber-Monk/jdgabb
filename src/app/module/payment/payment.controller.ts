import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.services";
import Stripe from "stripe";
import { Payment } from "./payment.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

const createPaymentSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = {
        ...req.body,
        userId: req.authUser?._id,
        email:req.authUser?.email
    }

    const result = await paymentService.checkout(payload)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "wait for redirect..",
        data: result
    })

});




export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !endpointSecret) {
    return res.status(400).send("Missing signature or webhook secret");
  }

  let event: Stripe.Event;

  try {
    // ⚡ Important: pass raw body (Buffer) for verification
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        await Payment.findOneAndUpdate(
          { stripeSessionId: session.id },
          { status: "PAID" }
        );
        console.log("✅ Payment succeeded for session:", session.id);
        break;

      case "checkout.session.expired":
      case "checkout.session.async_payment_failed":
        const failedSession = event.data.object as Stripe.Checkout.Session;
        await Payment.findOneAndUpdate(
          { stripeSessionId: failedSession.id },
          { status: "CANCEL" }
        );
        console.log("❌ Payment failed or expired:", failedSession.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send("Received"); // Must return 200
  } catch (error) {
    console.error("Error handling event:", error);
    res.status(500).send("Internal server error");
  }
};
export const PaymentController = {
    createPaymentSession,
    stripeWebhook
}