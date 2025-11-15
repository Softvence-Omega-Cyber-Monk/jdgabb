import { Environment, LogLevel, Paddle } from '@paddle/paddle-node-sdk'
import catchAsync from "../../utils/catchAsync";
import { envVers } from "../../config/env";

const paddle = new Paddle(envVers.PADDLE_API_KEY, {
  environment: Environment.sandbox,
  logLevel: LogLevel.verbose,
})


// ✅ Create Checkout Controller
export const createPaddleCheckout = catchAsync(async (req, res) => {
  const userId = req.authUser?._id;
  const email = req.authUser?.email;
  const { amount, paymentType } = req.body;

  const priceId =
    paymentType === "PROMPT"
      ? "pri_01k9y8214mmhqs97xq5et8j4z4"
      : "pri_01k9y7xnjckvvfdc071ts4kr30";

  try {

    

    const checkout = await (paddle as any).checkout.create({
      customer_email: email,
      product_id: priceId,
      quantity: 1,
      passthrough: JSON.stringify({
        userId,
        paymentType,
        amount,
      }),
      return_url: "https://yourapp.com/payment-success",
      cancel_url: "https://yourapp.com/payment-cancel",
    });

    res.status(200).json({
      success: true,
      message: "Paddle checkout created successfully",
      data: {
        checkout_url: checkout.response?.url,
        checkout_id: checkout.response?.checkout_id,
      },
    });
  } catch (error: any) {
    console.error("❌ Paddle checkout error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create Paddle checkout",
      error: error.message,
    });
  }
});