import cron from "node-cron";
import { User } from "../module/user/userModel";
import { sendNotification } from "./sendNotification";
import { Project } from "../module/project/project.model";
import { TaskTrushModel } from "../module/taskTrash/trashModel";


cron.schedule("0 0 * * *", async () => {
  console.log("🕛 Running daily jobs:", new Date());

  try {
    const today = new Date();

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
    };

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    
    const trashItems = await TaskTrushModel.find({
      createdAt: { $lte: thirtyDaysAgo }
    });

    for (const trash of trashItems) {
      const { userId, taskId } = trash;

 
      const project = await Project.findOne({
        userId: userId,
        "tasks._id": taskId,
        "tasks.isComplite": true
      });

     
      if (!project) {
        console.log(`⏭️ Task ${taskId} skipped (not completed or not found).`);
        continue;
      }

     
      await Project.updateOne(
        { userId: userId },
        { $pull: { tasks: { _id: taskId } } }
      );

     
      await TaskTrushModel.deleteOne({ _id: trash._id });

    }


  } catch (error) {
    console.error("❌ Error in daily cron job:", error);
  }
});
