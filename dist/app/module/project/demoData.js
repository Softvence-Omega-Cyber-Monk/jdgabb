"use strict";
// import mongoose from "mongoose";
Object.defineProperty(exports, "__esModule", { value: true });
// // প্রত্যেক user শুধু তার নিজের project-এর AI এর সাথে chat করতে পারবে, globally না।
// // প্রতিটা chat project-specific হবে।
// // Free users ২০টা প্রশ্ন পর্যন্ত করতে পারবে।
// // Paid users $1.99 দিলে ২০০টা question করতে পারবে & Pora jodi abar o 1.99 pay kora tahola aro 200 ta + hoba।
// // আর $5 দিলে ৭ দিনের জন্য unlimited question করতে পারবে pora jodi abar 7$ pay kora tahola agar day + new 7 days + hoba।
// // ami protita chat korar somoy o aga koto ta chat korca aita check korbo 
// // 💳 Upgrade plan or extend
// export const upgradePlan = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const { projectId } = req.params;
//   const { amount } = req.body; // 1.99 or 5
//   const project = await Project.findById(projectId);
//   if (!project) throw new AppError(404, "Project not found");
//   let newPlan = project.plan;
//   let newPromptLimit = project.promptLimit;
//   let newExpire = project.planExpireAt;
//   if (amount === 1.99) {
//     // 🟦 Add 200 more prompts
//     newPlan = "pro";
//     newPromptLimit += 200; // existing + 200
//     newExpire = null; // no expiry for pro
//   }
//   if (amount === 5) {
//     // 🟩 Extend or create new 7-day unlimited
//     newPlan = "premium";
//     const now = new Date();
//     const sevenDays = 7 * 24 * 60 * 60 * 1000;
//     // যদি আগের premium এখনো active থাকে → extend করো
//     if (project.planExpireAt && new Date(project.planExpireAt) > now) {
//       newExpire = new Date(project.planExpireAt.getTime() + sevenDays);
//     } else {
//       newExpire = new Date(now.getTime() + sevenDays);
//     }
//     // premium এ unlimited prompt
//     newPromptLimit = Infinity;
//   }
//   project.plan = newPlan;
//   project.promptLimit = newPromptLimit;
//   project.planExpireAt = newExpire;
//   await project.save();
//   res.status(200).json({
//     success: true,
//     message: "Plan upgraded successfully!",
//     data: {
//       plan: project.plan,
//       promptLimit: project.promptLimit,
//       planExpireAt: project.planExpireAt,
//     },
//   });
// });
// import axios from "axios";
// import { envVers } from "../config/env";
// export const chatWithAI = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const { projectId } = req.params;
//   const { userMessage } = req.body;
//   const project = await Project.findById(projectId);
//   if (!project) throw new AppError(404, "Project not found");
//   // 🧠 Check plan limits
//   const totalChats = project.chat.filter(c => c.askedBy === "user").length;
//   if (project.plan === "free" && totalChats >= 20) {
//     throw new AppError(403, "Free plan limit reached (20 prompts). Please upgrade.");
//   }
//   if (project.plan === "pro" && totalChats >= project.promptLimit) {
//     throw new AppError(403, `Pro plan limit reached (${project.promptLimit} prompts).`);
//   }
//   if (project.plan === "premium") {
//     if (!project.planExpireAt || new Date() > project.planExpireAt) {
//       throw new AppError(403, "Your premium plan has expired. Please renew.");
//     }
//   }
//   // 🧩 Step 1: push user message
//   project.chat.push({ question: userMessage, answer: null, askedBy: "user" });
//   // 🧩 Step 2: get AI response
//   const result = await axios.post(`${envVers.AI_ROOT_URL}/projects/chat/${projectId}`, {
//     message: userMessage,
//   });
//   const aiAnswer = result.data?.answer || "Sorry, I couldn’t understand that.";
//   // 🧩 Step 3: push AI reply
//   project.chat.push({ question: null, answer: aiAnswer, askedBy: "AI" });
//   await project.save();
//   res.status(200).json({
//     success: true,
//     data: {
//       aiAnswer,
//       totalChats: project.chat.length,
//       remainingPrompts:
//         project.promptLimit === Infinity
//           ? "Unlimited"
//           : Math.max(0, project.promptLimit - totalChats),
//     },
//   });
// });
// import { Request, Response, NextFunction } from "express";
// import { Project } from "../models/project.model";
// import { AppError } from "../utils/AppError";
// import { catchAsync } from "../utils/catchAsync";
// export const upgradePlans = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const { projectId } = req.params;
//   const { amount } = req.body; // উদাহরণ: 1.99 বা 5
//   const project = await Project.findById(projectId);
//   if (!project) throw new AppError(404, "Project not found");
//   let newPlan = project.plan;
//   let newPromptLimit = project.promptLimit;
//   let newExpire = project.planExpireAt;
//   // 💰 1.99 → 200 prompt যোগ হবে (replace না, add হবে)
//   if (amount === 1.99) {
//     newPlan = "pro";
//     // যদি আগেই Infinity (premium) থাকে, তাহলে limit update করা লাগবে না
//     if (project.promptLimit !== Infinity) {
//       newPromptLimit += 200;
//     }
//     newExpire = null; // pro plan-এর expiry নাই
//   }
//   // 💰 5 → ৭ দিনের জন্য unlimited (extendable)
//   if (amount === 5) {
//     newPlan = "premium";
//     const now = new Date();
//     const sevenDays = 7 * 24 * 60 * 60 * 1000;
//     // আগের premium সময় এখনো বাকি থাকলে → extend করো
//     if (project.planExpireAt && new Date(project.planExpireAt) > now) {
//       newExpire = new Date(new Date(project.planExpireAt).getTime() + sevenDays);
//     } else {
//       // expired বা প্রথমবার কিনলে → এখন থেকে ৭ দিন
//       newExpire = new Date(now.getTime() + sevenDays);
//     }
//     newPromptLimit = Infinity; // premium unlimited
//   }
//   // ✅ Update & Save
//   project.plan = newPlan;
//   project.promptLimit = newPromptLimit;
//   project.planExpireAt = newExpire;
//   await project.save();
//   res.status(200).json({
//     success: true,
//     message: "Plan upgraded successfully!",
//     data: {
//       plan: project.plan,
//       promptLimit:
//         project.promptLimit === Infinity ? "Unlimited" : project.promptLimit,
//       planExpireAt: project.planExpireAt,
//     },
//   });
// });
//# sourceMappingURL=demoData.js.map