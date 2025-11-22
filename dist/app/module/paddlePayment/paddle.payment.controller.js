"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaddleCheckout = void 0;
const paddle_node_sdk_1 = require("@paddle/paddle-node-sdk");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const env_1 = require("../../config/env");
const paddle = new paddle_node_sdk_1.Paddle(env_1.envVers.PADDLE_API_KEY, {
    environment: paddle_node_sdk_1.Environment.sandbox,
    logLevel: paddle_node_sdk_1.LogLevel.verbose,
});
// ✅ Create Checkout Controller
exports.createPaddleCheckout = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.authUser?._id;
    const email = req.authUser?.email;
    const { amount, paymentType } = req.body;
    const priceId = paymentType === "PROMPT"
        ? "pri_01k9y8214mmhqs97xq5et8j4z4"
        : "pri_01k9y7xnjckvvfdc071ts4kr30";
    try {
        // Step 1: Create or get customer first
        let customer;
        try {
            // Try to find existing customer by email
            const customersList = await paddle.customers.list({ email: [email] });
            // Access customers using iterator or toArray()
            const customersArray = [];
            for await (const cust of customersList) {
                customersArray.push(cust);
            }
            customer = customersArray[0];
        }
        catch (err) {
            // Customer doesn't exist, create new one
            console.log('Creating new customer...');
        }
        // If no customer found, create one
        if (!customer) {
            customer = await paddle.customers.create({
                email: email,
                name: req.authUser?.name || email.split('@')[0],
            });
        }
        // Step 2: Create transaction with customer ID
        const transaction = await paddle.transactions.create({
            items: [
                {
                    priceId: priceId,
                    quantity: 1,
                },
            ],
            customData: {
                userId: userId?.toString(),
                paymentType,
                amount,
            },
            customerId: customer.id,
        });
        console.log('Transaction created:', {
            id: transaction.id,
            status: transaction.status,
            checkout: transaction.checkout,
        });
        // Get the actual Paddle checkout URL
        // Paddle SDK sometimes doesn't return checkout.url properly in sandbox
        // So we construct it manually using the transaction ID
        const checkoutUrl = `https://sandbox-checkout.paddle.com/checkout?_ptxn=${transaction.id}`;
        console.log('Checkout URL:', checkoutUrl);
        res.status(200).json({
            success: true,
            message: "Paddle checkout created successfully",
            data: {
                checkout_url: checkoutUrl,
                transaction_id: transaction.id,
                customer_id: customer.id,
                status: transaction.status,
            },
        });
    }
    catch (error) {
        console.error("❌ Paddle checkout error:", error);
        console.error("Error details:", error.response?.data || error.message);
        res.status(400).json({
            success: false,
            message: "Failed to create Paddle checkout",
            error: error.message || "Unknown error occurred",
            details: error.response?.data || null,
        });
    }
});
// ✅ Webhook Handler for Paddle Events (BACKEND PAYMENT CONTROL)
// export const handlePaddleWebhook = catchAsync(async (req, res) => {
//   const signature = req.headers['paddle-signature'] as string;
//   try {
//     // Verify webhook signature
//     const eventData = paddle.webhooks.unmarshal(
//       JSON.stringify(req.body),
//       envVers.PADDLE_WEBHOOK_SECRET,
//       signature
//     );
//     // Handle different event types
//     switch (eventData.eventType) {
//       case 'transaction.completed':
//         await handleTransactionCompleted(eventData.data);
//         break;
//       case 'transaction.payment_failed':
//         await handleTransactionFailed(eventData.data);
//         break;
//       case 'transaction.updated':
//         await handleTransactionUpdated(eventData.data);
//         break;
//       default:
//         console.log('Unhandled event type:', eventData.eventType);
//     }
//     res.status(200).json({ received: true });
//   } catch (error: any) {
//     console.error('❌ Webhook verification failed:', error);
//     res.status(400).json({
//       success: false,
//       message: 'Webhook verification failed',
//     });
//   }
// });
// 🎯 Handle Successful Payment (BACKEND CONTROL)
// async function handleTransactionCompleted(transactionData: any) {
//   try {
//     const customData = JSON.parse(transactionData.customData || '{}');
//     const { userId, paymentType, amount } = customData;
//     console.log('✅ Payment Completed:', {
//       transactionId: transactionData.id,
//       userId,
//       amount: transactionData.details.totals.total,
//       paymentType,
//     });
//     // TODO: Import your User and Transaction models
//     // const User = require('../../models/User');
//     // const Transaction = require('../../models/Transaction');
//     // 1. Check if transaction already processed (prevent duplicates)
//     // const existingTransaction = await Transaction.findOne({ 
//     //   paddleTransactionId: transactionData.id 
//     // });
//     // 
//     // if (existingTransaction) {
//     //   console.log('Transaction already processed, skipping...');
//     //   return;
//     // }
//     // 2. Update user credits/subscription
//     // const user = await User.findById(userId);
//     // if (!user) {
//     //   throw new Error(`User not found: ${userId}`);
//     // }
//     // 3. Add credits based on payment type
//     // if (paymentType === 'PROMPT') {
//     //   user.credits += 100; // Add 100 credits for prompt payment
//     // } else {
//     //   user.credits += 500; // Add 500 credits for other payment
//     // }
//     // 
//     // user.isPremium = true; // Mark as premium if needed
//     // await user.save();
//     // 4. Save transaction record
//     // await Transaction.create({
//     //   userId: user._id,
//     //   paddleTransactionId: transactionData.id,
//     //   amount: transactionData.details.totals.total,
//     //   currency: transactionData.currencyCode,
//     //   paymentType,
//     //   status: 'completed',
//     //   paymentMethod: transactionData.payments?.[0]?.methodDetails?.type || 'unknown',
//     //   completedAt: new Date(transactionData.createdAt),
//     //   metadata: {
//     //     customerId: transactionData.customerId,
//     //     receiptUrl: transactionData.receiptData?.url,
//     //   }
//     // });
//     // 5. Send confirmation email (optional)
//     // await sendPaymentConfirmationEmail({
//     //   to: user.email,
//     //   userName: user.name,
//     //   amount: transactionData.details.totals.total,
//     //   currency: transactionData.currencyCode,
//     //   credits: user.credits,
//     //   transactionId: transactionData.id,
//     // });
//     console.log(`✅ Successfully processed payment for user ${userId}`);
//   } catch (error) {
//     console.error('❌ Error processing completed transaction:', error);
//     // TODO: Send alert to admin or logging service
//     throw error;
//   }
// }
// 🎯 Handle Failed Payment (BACKEND CONTROL)
// async function handleTransactionFailed(transactionData: any) {
//   try {
//     const customData = JSON.parse(transactionData.customData || '{}');
//     const { userId, paymentType } = customData;
//     console.log('❌ Payment Failed:', {
//       transactionId: transactionData.id,
//       userId,
//       reason: transactionData.payments?.[0]?.errorCode,
//     });
//     // TODO: Import your models
//     // const User = require('../../models/User');
//     // const Transaction = require('../../models/Transaction');
//     // 1. Log failed transaction
//     // await Transaction.create({
//     //   userId,
//     //   paddleTransactionId: transactionData.id,
//     //   amount: transactionData.details.totals.total,
//     //   currency: transactionData.currencyCode,
//     //   paymentType,
//     //   status: 'failed',
//     //   failureReason: transactionData.payments?.[0]?.errorCode,
//     //   failedAt: new Date(),
//     // });
//     // 2. Send failure notification email
//     // const user = await User.findById(userId);
//     // await sendPaymentFailedEmail({
//     //   to: user.email,
//     //   userName: user.name,
//     //   reason: transactionData.payments?.[0]?.errorCode,
//     //   retryUrl: `${envVers.FRONTEND_URL}/payment-retry?transactionId=${transactionData.id}`,
//     // });
//     console.log(`❌ Logged failed payment for user ${userId}`);
//   } catch (error) {
//     console.error('❌ Error processing failed transaction:', error);
//   }
// }
// 🎯 Handle Transaction Updates (BACKEND CONTROL)
// async function handleTransactionUpdated(transactionData: any) {
//   try {
//     console.log('🔄 Transaction Updated:', {
//       transactionId: transactionData.id,
//       status: transactionData.status,
//     });
//     // TODO: Update transaction status in database
//     // await Transaction.findOneAndUpdate(
//     //   { paddleTransactionId: transactionData.id },
//     //   { 
//     //     status: transactionData.status,
//     //     updatedAt: new Date(),
//     //   }
//     // );
//   } catch (error) {
//     console.error('❌ Error processing transaction update:', error);
//   }
// }
// export const getTransactionStatus = catchAsync(async (req, res) => {
//   const { transactionId } = req.params;
//   try {
//     const transaction = await paddle.transactions.get(transactionId);
//     res.status(200).json({
//       success: true,
//       data: {
//         id: transaction.id,
//         status: transaction.status,
//         amount: transaction.details.totals.total,
//         currency: transaction.currencyCode,
//         customData: JSON.parse(transaction.customData || '{}'),
//       },
//     });
//   } catch (error: any) {
//     console.error('❌ Error fetching transaction:', error);
//     res.status(400).json({
//       success: false,
//       message: 'Failed to fetch transaction',
//       error: error.message,
//     });
//   }
// });
//# sourceMappingURL=paddle.payment.controller.js.map