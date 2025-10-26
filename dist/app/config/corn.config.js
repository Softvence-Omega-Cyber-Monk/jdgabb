"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const userModel_1 = require("../module/user/userModel");
// প্রতিদিন রাত ১২ টায় রান হবে
node_cron_1.default.schedule("0 0 * * *", async () => {
    console.log("Running daily chat limit update:", new Date());
    try {
        const today = new Date();
        const result = await userModel_1.User.updateMany({ subscriptionTypeDate: { $gt: today } }, // সাবস্ক্রিপশন একটিভ
        { $set: { dayliChatLimit: 200 } } // আপডেট
        );
        console.log(`${result.modifiedCount} user(s) updated.`);
    }
    catch (error) {
        console.error("Error updating daily chat limit:", error);
    }
});
//# sourceMappingURL=corn.config.js.map