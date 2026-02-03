"use strict";
// // import { Request, Response, NextFunction } from "express";
// // import jwt, { JwtPayload } from "jsonwebtoken";
// // import AppError from "../utils/AppError";
// // import { User } from "../module/user/userModel";
// // import { envVers } from "../config/env";
// // import { sendNotification } from "../config/sendNotification";
Object.defineProperty(exports, "__esModule", { value: true });
// // export const checkChatAccess = async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //         const accessToken = req.headers?.authorization;
// //         if (!accessToken) {
// //             throw new AppError(401, "No token provided");
// //         }
// //         console.log(accessToken);
// //         const decoded = jwt.verify(accessToken, envVers.JWT.JWT_ACCESS_SECRATE) as JwtPayload;
// //         const user = await User.findById(decoded.userId);
// //         if (!user) throw new AppError(404, "User not found");
// //         console.log(user);
// //         if (user.subscriptionTypeDate) {
// //             const now = new Date();
// //             const expireDate = new Date(user.subscriptionTypeDate);
// //             if (now > expireDate) {
// //                 user.subscriptionTypeDate = undefined;
// //                 await user.save();
// //                 sendNotification(
// //                     String(user?._id),
// //                     "New Notification",
// //                     "Your subscription has expired. Please renew."
// //                 );
// //                 // throw new AppError(403, "Your subscription has expired. Please renew.");
// //                 res.status(400).json({ isSubscription: false, statusSecrate: 800, message: "Your subscription has expired. Please renew." });
// //             }
// //             if (Number(user.dayliChatLimit) <= 0) {
// //                 sendNotification(
// //                     String(user?._id),
// //                     "New Notification",
// //                     "Your daily chat limit has finished. Please wait until tomorrow."
// //                 );
// //                 throw new AppError(
// //                     403,
// //                     "Your daily chat limit has finished. You can’t chat anymore today."
// //                 );
// //             }
// //             user.dayliChatLimit = Number(user.dayliChatLimit) - 1;
// //             user.totalChatUseInWeek = Number(user.totalChatUseInWeek) + 1;
// //             await user.save();
// //             req.authUser = user;
// //             return next();
// //         }
// //         if (user.chatUsed >= user.chatLimit) {
// //             sendNotification(String(user?._id), "New Notification", "Chat limit reached. Please upgrade your plan.")
// //             // throw new AppError(403, "Chat limit reached. Please upgrade your plan.");
// //             res.status(400).json({ isSubscription: false, statusSecrate: 800, message: "Chat limit reached. Please upgrade your plan." });
// //         };
// //         user.chatUsed += 1;
// //         console.log("Chat Used Update");
// //         await user.save();
// //         req.authUser = user;
// //         next();
// //     } catch (error) {
// //         console.error("Chat access check failed:", error);
// //         next(error);
// //     }
// // };
// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import AppError from "../utils/AppError";
// import { User } from "../module/user/userModel";
// import { envVers } from "../config/env";
// import { sendNotification } from "../config/sendNotification";
// export const checkChatAccess = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const accessToken = req.headers?.authorization;
//     if (!accessToken) {
//       throw new AppError(401, "No token provided");
//     }
//     const decoded = jwt.verify(accessToken, envVers.JWT.JWT_ACCESS_SECRATE) as JwtPayload;
//     const user = await User.findById(decoded.userId);
//     if (!user) throw new AppError(404, "User not found");
//     const now = new Date();
//     // 🔹 If user has subscription
//     if (user.subscriptionTypeDate) {
//       const expireDate = new Date(user.subscriptionTypeDate);
//       // ✅ Check if subscription expired
//       if (now > expireDate) {
//         user.subscriptionTypeDate = undefined;
//         await user.save();
//         sendNotification(
//           String(user._id),
//           "New Notification",
//           "Your subscription has expired. Please renew."
//         );
//         return res
//           .status(400)
//           .json({
//             isSubscription: false,
//             statusSecrate: 800,
//             message: "Your subscription has expired. Please renew."
//           });
//       }
//       // ✅ Check daily chat limit
//       if (Number(user.dayliChatLimit) <= 0) {
//         sendNotification(
//           String(user._id),
//           "New Notification",
//           "Your daily chat limit has finished. Please wait until tomorrow."
//         );
//         throw new AppError(
//           403,
//           "Your daily chat limit has finished. You can’t chat anymore today."
//         );
//       }
//       // ✅ Deduct daily chat usage
//       user.dayliChatLimit = Number(user.dayliChatLimit) - 1;
//       user.totalChatUseInWeek = Number(user.totalChatUseInWeek) + 1;
//       await user.save();
//       req.authUser = user;
//       return next();
//     }
//     // 🔹 If user has no subscription (Free Plan)
//     if (Number(user.chatUsed) >= Number(user.chatLimit)) {
//       sendNotification(
//         String(user._id),
//         "New Notification",
//         "Chat limit reached. Please upgrade your plan."
//       );
//       return res
//         .status(400)
//         .json({
//           isSubscription: false,
//           statusSecrate: 800,
//           message: "Chat limit reached. Please upgrade your plan."
//         });
//     }
//     // ✅ Update chat usage for free users
//     user.chatUsed = Number(user.chatUsed) + 1;
//     await user.save();
//     req.authUser = user;
//     next();
//   } catch (error) {
//     console.error("Chat access check failed:", error);
//     next(error);
//   }
// };
//# sourceMappingURL=checkChatAccess.js.map