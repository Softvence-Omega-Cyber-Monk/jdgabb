import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.services";
import Stripe from "stripe";
import { Payment } from "./payment.model";
import { Types } from "mongoose";
import { User } from "../user/userModel";
import { sendNotification } from "../../config/sendNotification";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

// ✅ 1️⃣ Create Stripe Checkout Session + UNPAID payment entry
// ✅ createPaymentSession
const createPaymentSession = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    userId: req.authUser?._id,
    email: req.authUser?.email,
  };

  const result = await paymentService.checkout(payload);

  if (!result || !result.sessionId) {
    throw new Error("Failed to create Stripe session");
  }

  await Payment.create({
    userId: new Types.ObjectId(payload.userId),
    sessionId: result.sessionId,
    amount: payload.amount,
    paymentType: payload.paymentType,
    paymentStauts: "UNPAID",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "wait for redirect..",
    data: result,
  });
});


const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    console.log("✅ Webhook verified:", event.type);
  } catch (err: any) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle event types
  try {
    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
      const sessionId = session.id;
      const userId = session.metadata?.userId;
      const paymentType = session.metadata?.paymentType || "PROMPT";
      const amount = (session.amount_total as number) / 100;

      // Update payment
      const updatedPayment = await Payment.findOneAndUpdate(
        { sessionId },
        { $set: { paymentStauts: "PAID" } },
        { new: true }
      );

      console.log("✅ Payment updated:", updatedPayment);

      // User update
      const user = await User.findById(userId);
      if (user) {
        if (paymentType === "PROMPT") {
          user.chatLimit = (user.chatLimit || 0) + 300;
          await sendNotification(String(user?._id), "Payment", "prompt payment success");
        } else if (paymentType === "SUBSCRIPTION") {
          const now = new Date();
          let newExpiryDate: Date;

          if (user.subscriptionTypeDate && user.subscriptionTypeDate > now) {
            // আগের date এখনও valid → আগের date + 7 দিন
            newExpiryDate = new Date(user.subscriptionTypeDate);
            newExpiryDate.setDate(newExpiryDate.getDate() + 7);
          } else {
            // আগের date expired বা null → আজ থেকে +7 দিন
            newExpiryDate = new Date(now);
            newExpiryDate.setDate(newExpiryDate.getDate() + 7);
          }

          user.subscriptionTypeDate = newExpiryDate;
          user.isPaid = true;
          user.weellyChatLimite = 1400;
          user.totalChatUseInWeek = 0;
          user.dayliChatLimit = 200;
          await user.save();
          console.log(`📅 Subscription extended till: ${user.subscriptionTypeDate}`);
          await sendNotification(String(user?._id), "Payment", "Subscription payment success");
        }
        await user.save();
      }
    }

    res.status(200).send("Event processed");
  } catch (err: any) {
    console.error("❌ Error processing event:", err.message);
    res.status(400).send(`Webhook error: ${err.message}`);
  }
};


const getAllPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  console.log(userId);
  const result = await Payment.find({ userId: userId });
  console.log(result);
  res.status(200).send({ result });
});


export const PaymentController = {
  createPaymentSession,
  stripeWebhook,
  getAllPayment
};
