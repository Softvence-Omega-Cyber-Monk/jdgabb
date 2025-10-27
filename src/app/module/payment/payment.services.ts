import { Types } from "mongoose";
import Stripe from "stripe";
import { envVers } from "../../config/env";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const checkout = async (data: { userId: Types.ObjectId; email: string; amount: number; paymentType: string }) => {
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


export const paymentService = { checkout };

