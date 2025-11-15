import { Router } from "express";
import { protectUser } from "../../middleware/protect";
import { createPaddleCheckout } from "./paddle.payment.controller";

const paddlePaymentRouter = Router();




paddlePaymentRouter.post("/paddle_checkout" , protectUser() , createPaddleCheckout);





export default paddlePaymentRouter;