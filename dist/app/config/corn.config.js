"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const userModel_1 = require("../module/user/userModel");
const project_model_1 = require("../module/project/project.model");
const sendNotification_1 = require("./sendNotification");
// প্রতিদিন রাত ১২ টায় রান হবে
node_cron_1.default.schedule("0 0 * * *", async () => {
    console.log("🕛 Running daily jobs:", new Date());
    try {
        const today = new Date();
        // ✅ 1️⃣ Daily Chat Limit Reset
        const result = await userModel_1.User.updateMany({ subscriptionTypeDate: { $gt: today } }, { $set: { dayliChatLimit: 200 } });
        // 🔔 Active users notification
        const activeUsers = await userModel_1.User.find({
            subscriptionTypeDate: { $gt: today },
            fcmToken: { $exists: true, $ne: null },
        });
        for (const user of activeUsers) {
            await (0, sendNotification_1.sendNotification)(user._id.toString(), "Daily Chat Limit Reset 🎯", "Your daily chat limit has been refreshed! You can now use 200 messages for today.");
        }
        // ✅ 2️⃣ Task Reminder Notification
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);
        const startOfNextDay = new Date(nextDay.setHours(0, 0, 0, 0));
        const endOfNextDay = new Date(nextDay.setHours(23, 59, 59, 999));
        // Task যেগুলা আগামীকাল due
        const projects = await project_model_1.Project.find({
            "tasks.taskDueDate": { $gte: startOfNextDay, $lte: endOfNextDay },
        }).populate("userId");
        console.log(`📌 Found ${projects.length} projects with due tasks tomorrow.`);
        for (const project of projects) {
            const user = project.userId;
            const tomorrowTasks = project.tasks.filter((t) => t.taskDueDate &&
                t.taskDueDate >= startOfNextDay &&
                t.taskDueDate <= endOfNextDay &&
                !t.isComplite &&
                !t.isDeleted);
            for (const task of tomorrowTasks) {
                await (0, sendNotification_1.sendNotification)(user._id.toString(), "Task Reminder 🕐", `Your task "${task.task}" is due tomorrow. Please complete it soon!`);
            }
        }
    }
    catch (error) {
        console.error("❌ Error in daily cron job:", error);
    }
});
//# sourceMappingURL=corn.config.js.map