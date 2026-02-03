"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = exports.revenueCatWebhook = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const stripe_1 = __importDefault(require("stripe"));
const payment_model_1 = require("./payment.model");
const mongoose_1 = require("mongoose");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover",
});
// ✅ 1️⃣ Create Stripe Checkout Session + UNPAID payment entry
// ✅ createPaymentSession
// Web View
// const createPaymentSession = catchAsync(async (req: Request, res: Response) => {
//   const payload = {
//     ...req.body,
//     userId: req.authUser?._id,
//     email: req.authUser?.email,
//   };
//   const result = await paymentService.checkout(payload);
//   if (!result || !result.sessionId) {
//     throw new Error("Failed to create Stripe session");
//   }
//   await Payment.create({
//     userId: new Types.ObjectId(payload.userId),
//     sessionId: result.sessionId,
//     amount: payload.amount,
//     paymentType: payload.paymentType,
//     paymentStauts: "UNPAID",
//   });
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "wait for redirect..",
//     data: result,
//   });
// });
// App View
const createPaymentSession = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.authUser?._id;
    const email = req.authUser?.email;
    const { amount, paymentType, currency = "usd" } = req.body;
    // create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency,
        metadata: {
            userId: String(userId),
            paymentType,
        },
        receipt_email: email,
    });
    // Create local record (UNPAID)
    await payment_model_1.Payment.create({
        userId: new mongoose_1.Types.ObjectId(userId),
        sessionId: paymentIntent.id,
        amount,
        paymentType,
        paymentStauts: "UNPAID",
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Payment intent created successfully",
        data: {
            clientSecret: paymentIntent.client_secret,
        },
    });
});
// Web View
// const stripeWebhook = async (req: Request, res: Response) => {
//   const sig = req.headers["stripe-signature"] as string;
//   let event: Stripe.Event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET as string
//     );
//   } catch (err: any) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }
//   // ✅ Handle event types
//   try {
//     const session = event.data.object as Stripe.Checkout.Session;
//     if (event.type === "checkout.session.completed") {
//       const sessionId = session.id;
//       const userId = session.metadata?.userId;
//       const paymentType = session.metadata?.paymentType || "PROMPT";
//       const amount = (session.amount_total as number) / 100;
//       // Update payment
//       const updatedPayment = await Payment.findOneAndUpdate(
//         { sessionId },
//         { $set: { paymentStauts: "PAID" } },
//         { new: true }
//       );
//       // User update
//       const user = await User.findById(userId);
//       if (user) {
//         if (paymentType === "PROMPT") {
//           user.chatLimit = (user.chatLimit || 0) + 300;
//           await sendNotification(String(user?._id), "Payment", "prompt payment success");
//         } else if (paymentType === "SUBSCRIPTION") {
//           const now = new Date();
//           let newExpiryDate: Date;
//           if (user.subscriptionTypeDate && user.subscriptionTypeDate > now) {
//             // আগের date এখনও valid → আগের date + 7 দিন
//             newExpiryDate = new Date(user.subscriptionTypeDate);
//             newExpiryDate.setDate(newExpiryDate.getDate() + 7);
//           } else {
//             // আগের date expired বা null → আজ থেকে +7 দিন
//             newExpiryDate = new Date(now);
//             newExpiryDate.setDate(newExpiryDate.getDate() + 7);
//           }
//           user.subscriptionTypeDate = newExpiryDate;
//           user.isPaid = true;
//           user.weellyChatLimite = 1400;
//           user.totalChatUseInWeek = 0;
//           user.dayliChatLimit = 200;
//           await user.save();
//           await sendNotification(String(user?._id), "Payment", "Subscription payment success");
//         }
//         await user.save();
//       }
//     }
//     res.status(200).send("Event processed");
//   } catch (err: any) {
//     res.status(400).send(`Webhook error: ${err.message}`);
//   }
// };
// const stripeWebhook = async (req: Request, res: Response) => {
//   const sig = req.headers["stripe-signature"] as string;
//   let event: Stripe.Event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET as string
//     );
//   } catch (err: any) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }
//   try {
//     if (event.type === "payment_intent.succeeded") {
//       const paymentIntent = event.data.object as Stripe.PaymentIntent;
//       const sessionId = paymentIntent.id;
//       const userId = paymentIntent.metadata?.userId;
//       const paymentType = paymentIntent.metadata?.paymentType || "PROMPT";
//       const amount = paymentIntent.amount / 100;
//       // Update local Payment record
//       await Payment.findOneAndUpdate(
//         { sessionId },
//         { $set: { paymentStauts: "PAID" } },
//         { new: true }
//       );
//       // Update User data
//       const user = await User.findById(userId);
//       if (user) {
//         if (paymentType === "PROMPT") {
//           user.chatLimit = (user.chatLimit || 0) + 300;
//           await sendNotification(String(user?._id), "Payment", "Prompt payment success");
//         } else if (paymentType === "SUBSCRIPTION") {
//           const now = new Date();
//           let newExpiryDate: Date;
//           if (user.subscriptionTypeDate && user.subscriptionTypeDate > now) {
//             newExpiryDate = new Date(user.subscriptionTypeDate);
//             newExpiryDate.setDate(newExpiryDate.getDate() + 7);
//           } else {
//             newExpiryDate = new Date(now);
//             newExpiryDate.setDate(newExpiryDate.getDate() + 7);
//           }
//           user.subscriptionTypeDate = newExpiryDate;
//           user.isPaid = true;
//           user.weellyChatLimite = 1400;
//           user.totalChatUseInWeek = 0;
//           user.dayliChatLimit = 200;
//           await sendNotification(String(user?._id), "Payment", "Subscription payment success");
//         }
//         await user.save();
//       }
//     }
//     res.status(200).send("✅ Event processed");
//   } catch (err: any) {
//     console.error(err);
//     res.status(400).send(`Webhook error: ${err.message}`);
//   }
// };
const revenueCatWebhook = async (req, res) => {
    try {
        // console.log("Req Body ---------------------------- : ", req.body);
        const bodyString = req.body.toString('utf8');
        const event = JSON.parse(bodyString);
        // console.log("Parse Json Event : ------------------ : ", event);
        const eventType = event.event.type;
        const userId = event.event.app_user_id;
        const price = event.event.price;
        const planName = event.event.product_id;
        const transaction_id = event.event.transaction_id;
        // Date 
        const event_triger_timestamp_ms = event.event.event_timestamp_ms;
        const expiration_subscription_at_ms = event.event.expiration_at_ms;
        const purchased_subscription_at_ms = event.event.expiration_at_ms;
        // console.log(subscriber_attributes);
        const subExpireDate = new Date(expiration_subscription_at_ms);
        console.log("----------------Start subExpire Date -------------:");
        console.log(subExpireDate);
        console.log("----------------End subExpire Date -------------:");
        console.log("---------------------------------------------------");
        const eventTrigerDate = new Date(event_triger_timestamp_ms);
        console.log("----------------Start eventTrigerDate Date -------------:");
        console.log(eventTrigerDate);
        console.log("----------------End eventTrigerDate Date -------------:");
        console.log("---------------------------------------------------");
        const purchasedSubscriptionDate = new Date(purchased_subscription_at_ms);
        console.log("----------------Start subExpire Date -------------:");
        console.log(purchasedSubscriptionDate);
        console.log("----------------End subExpire Date -------------:");
        console.log("---------------------------------------------------");
        // const userId = subscriber_attributes?.user_id?.value;
        // const plan = subscriber_attributes?.plan?.value;
        // const price = subscriber_attributes?.price?.value;
        console.log("----------------Info Data Start-------------:");
        console.log("Event Type:", eventType);
        console.log("UserId:", userId);
        // console.log("Plan:", plan);
        console.log("Price:", price);
        console.log("----------------Info Data End-------------:");
        switch (eventType) {
            case "INITIAL_PURCHASE":
                console.log("✅✅✅ Payment Purchase:", eventType);
                break;
            case "RENEWAL":
                // user.isPaid = true;
                // user.subscriptionTypeDate = new Date(expirationAtMs);
                // user.weellyChatLimite = 1400;
                // user.dayliChatLimit = 200;
                // user.totalChatUseInWeek = 0;
                // await sendNotification(
                //   userId,
                //   "Subscription",
                //   "Subscription activated successfully"
                // );
                console.log("✅ Payment Success:", eventType);
                break;
            case "CANCELLATION":
                console.log("⚠️ Subscription cancelled (still active until expiry)");
                break;
            case "EXPIRATION":
                // user.isPaid = false;
                console.log("❌ Subscription expired");
                // await sendNotification(
                //   userId,
                //   "Subscription",
                //   "Subscription expired"
                // );
                break;
            case "TEST":
                console.log("🧪 RevenueCat test event");
                break;
        }
        // await user.save();
        res.status(200).send("OK");
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Webhook error");
    }
};
exports.revenueCatWebhook = revenueCatWebhook;
const getAllPayment = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.id;
    console.log(userId);
    const result = await payment_model_1.Payment.find({ userId: userId });
    console.log(result);
    res.status(200).send({ result });
});
exports.PaymentController = {
    createPaymentSession,
    // stripeWebhook,
    getAllPayment
};
//# sourceMappingURL=payment.controller.js.map