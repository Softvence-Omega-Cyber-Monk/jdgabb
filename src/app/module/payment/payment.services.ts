// import mongoose from "mongoose";
// import { User } from "../user/userModel";
// import { Payment } from "./payment.model";

import { Request, Response } from "express";
import { Types } from "mongoose";


// const extendSubscription = async (userId: string, daysToAdd: number) => {
//     const user = await User.findById(userId);
//     if (!user) throw new Error("User not found");

//     const now = new Date();
//     let currentExpireDate: Date;

//     if (user.subscriptionTypeDate && user.subscriptionTypeDate > now) {

//         currentExpireDate = user.subscriptionTypeDate;
//     } else {

//         currentExpireDate = now;
//     }


//     const newExpireDate = new Date(currentExpireDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
//     user.subscriptionTypeDate = newExpireDate;

//     await user.save();

//     console.log("New subscription expire date:", user.subscriptionTypeDate);
//     return user.subscriptionTypeDate;
// };





// export const createPaymentSession = async (req: Request, res: Response) => {
//   try {
//     const { userId , amount, paymentType } = req.body;

//     const payment = await Payment.create({
//       userId: new mongoose.Types.ObjectId(userId),
//       paymentStauts: "UNPAID",
//       amount,
//       paymentType,
//     });

//     // ✅ Stripe Checkout Session তৈরি
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: `Payment for ${paymentType}`,
//             },
//             unit_amount: amount * 100, // cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
//       metadata: {
//         paymentId: payment._id.toString(), // later use in webhook
//       },
//     });

//     res.status(200).json({
//       success: true,
//       url: session.url,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Payment session creation failed" });
//   }
// };



// export const stripeWebhookHandler = async (req: Request, res: Response) => {
//   const sig = req.headers["stripe-signature"];
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret!);
//   } catch (err: any) {
//     console.error("⚠️ Webhook signature verification failed.", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // ✅ Handle event types
//   switch (event.type) {
//     case "checkout.session.completed": {
//       const session = event.data.object as any;
//       const paymentId = session.metadata.paymentId;

//       await Payment.findByIdAndUpdate(paymentId, {
//         paymentStauts: "PAID",
//       });
//       break;
//     }

//     case "checkout.session.expired":
//     case "checkout.session.async_payment_failed": {
//       const session = event.data.object as any;
//       const paymentId = session.metadata.paymentId;

//       await Payment.findByIdAndUpdate(paymentId, {
//         paymentStauts: "CANCEL",
//       });
//       break;
//     }

//     default:
//       console.log(`Unhandled event type: ${event.type}`);
//   }

//   res.status(200).json({ received: true });
// };



// const handlePay = async () => {
//   const res = await fetch("http://localhost:5000/api/payment/create-session", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       userId: currentUser._id,
//       amount: 500,
//       paymentType: "SUBSCRIPTION",
//     }),
//   });
//   const data = await res.json();
//   window.location.href = data.url;
// };
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const checkout = async (data: { userId: Types.ObjectId; email: string; amount: number }) => {
    try {
        const { userId, email, amount } = data;

        if (!userId || !email || !amount) {
            throw new Error("Missing required checkout data");
        }

        // 🧩 Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "AI Prompt Credits", // You can make this dynamic
                        },
                        unit_amount: amount * 100, // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.CLIENT_URL as string}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL as string}/payment-cancel`,
            metadata: {
                userId: userId.toString(),
            },
        });

        // 💾 Save to MongoDB (optional but recommended)
        // await Payment.create({
        //     userId,
        //     stripeSessionId: session.id,
        //     amount,
        //     status: "UNPAID",
        //     paymentType: "PROMPT",
        // });

        // ✅ Return session URL
        return {
            success: true,
            url: session.url,
        };
    } catch (error: any) {
        console.error("Checkout error:", error.message);
        return {
            success: false,
            message: "Failed to create Stripe checkout session",
            error: error.message,
        };
    }
};

export const paymentService = {
    checkout
}