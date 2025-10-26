import { Types } from "mongoose";
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// const checkout = async (data: { userId: Types.ObjectId; email: string; amount: number; paymentType: string }) => {
//   const { userId, email, amount, paymentType } = data;

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     customer_email: email,
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: paymentType === "PROMPT" ? "AI Prompt Credits" : "AI Subscription Plan",
//           },
//           unit_amount: amount * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
//     metadata: {
//       userId: userId.toString(),
//       paymentType,
//     },
//   });

//   return {
//     success: true,
//     url: session.url,
//     sessionId: session.id // ✅ send back to controller
//   };
// };

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
    // ✅ Flutter এর জন্য success_url/cancel_url দরকার নেই
    // success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    // cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    metadata: {
      userId: userId.toString(),
      paymentType,
    },
  });

  return {
    success: true,
    sessionId: session.id,
    paymentUrl: session.url, // Flutter এ পাঠাও
  };
};



export const paymentService = { checkout };

