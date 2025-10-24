"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../user/userModel");
const extendSubscription = async (userId, daysToAdd) => {
    const user = await userModel_1.User.findById(userId);
    if (!user)
        throw new Error("User not found");
    const now = new Date();
    let currentExpireDate;
    if (user.subscriptionTypeDate && user.subscriptionTypeDate > now) {
        currentExpireDate = user.subscriptionTypeDate;
    }
    else {
        currentExpireDate = now;
    }
    const newExpireDate = new Date(currentExpireDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    user.subscriptionTypeDate = newExpireDate;
    await user.save();
    console.log("New subscription expire date:", user.subscriptionTypeDate);
    return user.subscriptionTypeDate;
};
//# sourceMappingURL=payment.services.js.map