import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { protectUser } from "../../middleware/protect";
import { Role } from "../user/user.interface";

const PaymentRoute = Router();

PaymentRoute.post('/checkout', protectUser(Role.USER), PaymentController.createPaymentSession)


export default PaymentRoute;