import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.services";
import Stripe from "stripe";
import { Payment } from "./payment.model";
import { Types } from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

const createPaymentSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const payload = {
    ...req.body,
    userId: req.authUser?._id,
    email: req.authUser?.email
  }

  const result = await paymentService.checkout(payload)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "wait for redirect..",
    data: result
  })

});



const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  // 1️⃣ Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      req.body as Buffer, // Raw body, ensure the middleware is set to handle raw body (as explained earlier)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    console.log("✅ Webhook received:", event.type);
  } catch (err: any) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2️⃣ Handle Stripe events
  try {
    const session = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case 'checkout.session.completed':
        // Payment successful
        console.log('Payment successful for session:', session.id);

        // Optional: Save payment information to MongoDB
        const userId = session?.metadata?.userId; // Extract the userId from metadata
        const payment = await Payment.create({
          userId: new Types.ObjectId(userId),
          stripeSessionId: session.id,
          amount: session?.amount_total as any / 100, // Convert back to dollars
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
  } catch (err: any) {
    console.error("Error handling webhook event:", err.message);
    return res.status(400).send(`Error handling event: ${err.message}`);
  }
};



export const PaymentController = {
  createPaymentSession,
  stripeWebhook
}