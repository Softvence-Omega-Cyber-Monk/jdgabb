import cron from "node-cron";
import { User } from "../module/user/userModel";
import { sendNotification } from "./sendNotification";
import { Project } from "../module/project/project.model";
import { TaskTrushModel } from "../module/taskTrash/trashModel";

// প্রতিদিন রাত ১২ টায় রান হবে
cron.schedule("0 0 * * *", async () => {
  console.log("🕛 Running daily jobs:", new Date());

  try {
    const today = new Date();

    // =========================================
    // 1️⃣ Daily Chat Limit Reset
    // =========================================
    await User.updateMany(
      { subscriptionTypeDate: { $gt: today } },
      { $set: { dayliChatLimit: 200 } }
    );

    const activeUsers = await User.find({
      subscriptionTypeDate: { $gt: today },
      fcmToken: { $exists: true, $ne: null },
    });

    for (const user of activeUsers) {
      await sendNotification(
        user._id.toString(),
        "Daily Chat Limit Reset 🎯",
        "Your daily chat limit has been refreshed! You can now use 200 messages for today."
      );
    }

    // =========================================
    // 2️⃣ Task Reminder Notification
    // =========================================
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    const startOfNextDay = new Date(nextDay.setHours(0, 0, 0, 0));
    const endOfNextDay = new Date(nextDay.setHours(23, 59, 59, 999));

    const projects = await Project.find({
      "tasks.taskDueDate": { $gte: startOfNextDay, $lte: endOfNextDay },
    }).populate("userId");

    console.log(`📌 Found ${projects.length} projects with due tasks tomorrow.`);

    for (const project of projects) {
      const user = project.userId;

      const tomorrowTasks = project.tasks.filter(
        (t) =>
          t.taskDueDate &&
          t.taskDueDate >= startOfNextDay &&
          t.taskDueDate <= endOfNextDay &&
          !t.isComplite &&
          !t.isDeleted
      );

      for (const task of tomorrowTasks) {
        await sendNotification(
          user._id.toString(),
          "Task Reminder 🕐",
          `Your task "${task.task}" is due tomorrow. Please complete it soon!`
        );
      }
    }

    // =========================================
    // 3️⃣ 30 দিনের পুরনো + isComplite === true Task Delete
    // =========================================

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Trash থেকে ৩০ দিনের পুরনো taskId গুলো নাও
    const trashItems = await TaskTrushModel.find({
      createdAt: { $lte: thirtyDaysAgo }
    });

    console.log(`🗑️ Found ${trashItems.length} trash items older than 30 days.`);

    for (const trash of trashItems) {
      const { userId, taskId } = trash;

      // Project এ থাকা + isComplite=true হতে হবে
      const project = await Project.findOne({
        userId: userId,
        "tasks._id": taskId,
        "tasks.isComplite": true
      });

      // না হলে skip করো
      if (!project) {
        console.log(`⏭️ Task ${taskId} skipped (not completed or not found).`);
        continue;
      }

      // Project থেকে ওই task ডিলিট করো
      await Project.updateOne(
        { userId: userId },
        { $pull: { tasks: { _id: taskId } } }
      );

      // Trash থেকে ডিলিট করো
      await TaskTrushModel.deleteOne({ _id: trash._id });

      console.log(`🗑️ Deleted completed task: ${taskId}`);
    }

    console.log("🧹 Completed Trash Cleanup Process");

  } catch (error) {
    console.error("❌ Error in daily cron job:", error);
  }
});
