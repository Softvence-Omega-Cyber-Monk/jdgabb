"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const firebaseNotifacation_mode_1 = require("../module/firebaseNotification/firebaseNotifacation.mode;");
const userModel_1 = require("../module/user/userModel");
const fireBase_config_1 = require("./fireBase.config");
const sendNotification = async (userId, title, body) => {
    try {
        console.log("user is ", userId);
        const user = await userModel_1.User.findById(userId);
        if (!user || !user?.fcmToken) {
            console.log(`❌ No FCM token for user ${userId}`);
            return;
        }
        ;
        const message = {
            notification: { title, body },
            token: user.fcmToken,
        };
        const response = await fireBase_config_1.messaging.send(message);
        console.log("✅ Notification sent:", response);
        await firebaseNotifacation_mode_1.FirebaseNotificationModel.create({
            userId,
            title,
            body,
            timestamp: new Date(),
        });
    }
    catch (err) {
        console.error("⚠️ Error sending notification:", err);
    }
};
exports.sendNotification = sendNotification;
//# sourceMappingURL=sendNotification.js.map