
import { FirebaseNotificationModel } from "../module/firebaseNotification/firebaseNotifacation.mode;";
import { User } from "../module/user/userModel";
import { messaging } from "./fireBase.config";


export const sendNotification = async (
    userId: string,
    title: string,
    body: string,
): Promise<void> => {
    try {
        console.log("user is ", userId);

        const user = await User.findById(userId);

        if (!user || !user?.fcmToken) {
            console.log(`❌ No FCM token for user ${userId}`);
            return;
        }

        const message = {
            notification: { title, body },
            token: user.fcmToken,
        };



        const response = await messaging.send(message);

        console.log("✅ Notification sent:", response);

        await FirebaseNotificationModel.create({
            userId,
            title,
            body,
            timestamp: new Date(),
        });

    } catch (err) {
        console.error("⚠️ Error sending notification:", err);
    }
};