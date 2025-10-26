import cron from "node-cron";
import { User } from "../module/user/userModel";

// প্রতিদিন রাত ১২ টায় রান হবে
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily chat limit update:", new Date());

  try {
    const today = new Date();

    const result = await User.updateMany(
      { subscriptionTypeDate: { $gt: today } }, // সাবস্ক্রিপশন একটিভ
      { $set: { dayliChatLimit: 200 } }        // আপডেট
    );

    console.log(`${result.modifiedCount} user(s) updated.`);
  } catch (error) {
    console.error("Error updating daily chat limit:", error);
  }
});
