"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./app/config/pasport");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFoundRoute_1 = require("./app/utils/notFoundRoute");
const route_1 = require("./app/route/route");
const global_error_handler_1 = require("./app/middleware/global.error.handler");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
});
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
exports.app.post('/webhook', express_1.default.raw({ type: 'application/json' }), // This ensures the raw body is passed
async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    // 2️⃣ Verify webhook signature
    try {
        event = stripe.webhooks.constructEvent(req.body, // Pass the raw buffer to constructEvent
        sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("✅ Webhook received:", event.type);
    }
    catch (err) {
        console.error("❌ Webhook verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // 3️⃣ Handle webhook events
    try {
        const session = event.data.object;
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
    }
    catch (err) {
        console.error("Error handling webhook event:", err.message);
        return res.status(400).send(`Error handling event: ${err.message}`);
    }
});
// app.post(
//   "/api/stripe/webhook",
//   express.raw({ type: "application/json" }),
//   PaymentController.stripeWebhook
// );// Module Route
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
// Passport Authentication
exports.app.use((0, express_session_1.default)({
    secret: "secrate",
    resave: false,
    saveUninitialized: false
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
route_1.moduleRoute.forEach(item => exports.app.use(`/api/v1${item.path}`, item.routes));
exports.app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server runing success"
    });
});
exports.app.use(global_error_handler_1.globalErrorhandler);
exports.app.use(notFoundRoute_1.notFound);
//# sourceMappingURL=app.js.map