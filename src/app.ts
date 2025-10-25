import express, { Request, Response } from "express";
import cors from "cors";
import "./app/config/pasport"
import cookieParser from "cookie-parser";
import { notFound } from "./app/utils/notFoundRoute";
import { moduleRoute } from "./app/route/route";
import { globalErrorhandler } from "./app/middleware/global.error.handler";
import passport from "passport";
import expressSession from "express-session";
import { PaymentController } from "./app/module/payment/payment.controller";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-09-30.clover',
});

export const app = express();

app.use(cors({
    origin: ["http://localhost:5173" , "*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))


app.post(
  '/webhook',
  express.raw({ type: 'application/json' }), // This ensures the raw body is passed
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;

    // 2️⃣ Verify webhook signature
    try {
      event = stripe.webhooks.constructEvent(
        req.body as Buffer, // Pass the raw buffer to constructEvent
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
      console.log("✅ Webhook received:", event.type);
    } catch (err: any) {
      console.error("❌ Webhook verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // 3️⃣ Handle webhook events
    try {
      const session = event.data.object as Stripe.Checkout.Session;

      switch (event.type) {
        case "checkout.session.completed":
          console.log('Payment successful for session:', session.id);
          break;
        case "checkout.session.expired":
          console.log('Session expired for session:', session.id);
          break;
        case "checkout.session.async_payment_failed":
          console.log('Async payment failed for session:', session.id);
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
  }
);


// app.post(
//   "/api/stripe/webhook",
//   express.raw({ type: "application/json" }),
//   PaymentController.stripeWebhook
// );// Module Route


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Passport Authentication
app.use(expressSession({
    secret: "secrate",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

moduleRoute.forEach(item => app.use(`/api/v1${item.path}`, item.routes));





app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server runing success"
    })
});



app.use(globalErrorhandler);
app.use(notFound);