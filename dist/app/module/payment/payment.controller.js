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
const userModel_1 = require("../user/userModel");
const sendNotification_1 = require("../../config/sendNotification");
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
const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const sessionId = paymentIntent.id;
            const userId = paymentIntent.metadata?.userId;
            const paymentType = paymentIntent.metadata?.paymentType || "PROMPT";
            const amount = paymentIntent.amount / 100;
            // Update local Payment record
            await payment_model_1.Payment.findOneAndUpdate({ sessionId }, { $set: { paymentStauts: "PAID" } }, { new: true });
            // Update User data
            const user = await userModel_1.User.findById(userId);
            if (user) {
                if (paymentType === "PROMPT") {
                    user.chatLimit = (user.chatLimit || 0) + 300;
                    await (0, sendNotification_1.sendNotification)(String(user?._id), "Payment", "Prompt payment success");
                }
                else if (paymentType === "SUBSCRIPTION") {
                    const now = new Date();
                    let newExpiryDate;
                    if (user.subscriptionTypeDate && user.subscriptionTypeDate > now) {
                        newExpiryDate = new Date(user.subscriptionTypeDate);
                        newExpiryDate.setDate(newExpiryDate.getDate() + 7);
                    }
                    else {
                        newExpiryDate = new Date(now);
                        newExpiryDate.setDate(newExpiryDate.getDate() + 7);
                    }
                    user.subscriptionTypeDate = newExpiryDate;
                    user.isPaid = true;
                    user.weellyChatLimite = 1400;
                    user.totalChatUseInWeek = 0;
                    user.dayliChatLimit = 200;
                    await (0, sendNotification_1.sendNotification)(String(user?._id), "Payment", "Subscription payment success");
                }
                await user.save();
            }
        }
        res.status(200).send("✅ Event processed");
    }
    catch (err) {
        console.error(err);
        res.status(400).send(`Webhook error: ${err.message}`);
    }
};
const revenueCatWebhook = async (req, res) => {
    try {
        const event = req.body;
        const eventType = event.event.type;
        const userId = event.event.app_user_id;
        const productId = event.event.product_id;
        const expirationAtMs = event.event.expiration_at_ms;
        const user = await userModel_1.User.findById(userId);
        if (!user)
            return res.status(200).send("User not found");
        switch (eventType) {
            case "INITIAL_PURCHASE":
            case "RENEWAL":
                user.isPaid = true;
                user.subscriptionTypeDate = new Date(expirationAtMs);
                user.weellyChatLimite = 1400;
                user.dayliChatLimit = 200;
                user.totalChatUseInWeek = 0;
                await (0, sendNotification_1.sendNotification)(userId, "Subscription", "Subscription activated successfully");
                break;
            case "CANCELLATION":
            case "EXPIRATION":
                user.isPaid = false;
                await (0, sendNotification_1.sendNotification)(userId, "Subscription", "Subscription expired");
                break;
        }
        await user.save();
        // res.status(200).send("RevenueCat event processed");
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
    stripeWebhook,
    getAllPayment
};
//# sourceMappingURL=payment.controller.js.map