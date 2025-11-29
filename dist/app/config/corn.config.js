"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const userModel_1 = require("../module/user/userModel");
const sendNotification_1 = require("./sendNotification");
const project_model_1 = require("../module/project/project.model");
const trashModel_1 = require("../module/taskTrash/trashModel");
node_cron_1.default.schedule("0 0 * * *", async () => {
    console.log("🕛 Running daily jobs:", new Date());
    try {
        const today = new Date();
        await userModel_1.User.updateMany({ subscriptionTypeDate: { $gt: today } }, { $set: { dayliChatLimit: 200 } });
        const activeUsers = await userModel_1.User.find({
            subscriptionTypeDate: { $gt: today },
            fcmToken: { $exists: true, $ne: null },
        });
        for (const user of activeUsers) {
            await (0, sendNotification_1.sendNotification)(user._id.toString(), "Daily Chat Limit Reset 🎯", "Your daily chat limit has been refreshed! You can now use 200 messages for today.");
        }
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);
        const startOfNextDay = new Date(nextDay.setHours(0, 0, 0, 0));
        const endOfNextDay = new Date(nextDay.setHours(23, 59, 59, 999));
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
        ;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const trashItems = await trashModel_1.TaskTrushModel.find({
            createdAt: { $lte: thirtyDaysAgo }
        });
        for (const trash of trashItems) {
            const { userId, taskId } = trash;
            const project = await project_model_1.Project.findOne({
                userId: userId,
                "tasks._id": taskId,
                "tasks.isComplite": true
            });
            if (!project) {
                console.log(`⏭️ Task ${taskId} skipped (not completed or not found).`);
                continue;
            }
            await project_model_1.Project.updateOne({ userId: userId }, { $pull: { tasks: { _id: taskId } } });
            await trashModel_1.TaskTrushModel.deleteOne({ _id: trash._id });
        }
    }
    catch (error) {
        console.error("❌ Error in daily cron job:", error);
    }
});
//# sourceMappingURL=corn.config.js.map