import { NotificationModel } from "./notifications.model";
export declare const notificationServices: {
    findNotificationByUserId: (id: String) => Promise<(import("mongoose").Document<unknown, {}, {
        push: boolean;
        userId: import("mongoose").Types.ObjectId;
        inAppReminder: boolean;
        smart: boolean;
        snoozeOptions: number[];
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        push: boolean;
        userId: import("mongoose").Types.ObjectId;
        inAppReminder: boolean;
        smart: boolean;
        snoozeOptions: number[];
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    updateNotificationByUserID: (id: string, updatedData: Partial<typeof NotificationModel>) => Promise<(import("mongoose").Document<unknown, {}, {
        push: boolean;
        userId: import("mongoose").Types.ObjectId;
        inAppReminder: boolean;
        smart: boolean;
        snoozeOptions: number[];
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        push: boolean;
        userId: import("mongoose").Types.ObjectId;
        inAppReminder: boolean;
        smart: boolean;
        snoozeOptions: number[];
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=notifications.services.d.ts.map