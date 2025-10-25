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


export const app = express();

app.use(cors({
    origin: ["http://localhost:5173" , "*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

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
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.stripeWebhook
);// Module Route
moduleRoute.forEach(item => app.use(`/api/v1${item.path}`, item.routes));


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server runing success"
    })
});



app.use(globalErrorhandler);
app.use(notFound);