"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationServices = void 0;
const notifications_model_1 = require("./notifications.model");
const findNotificationByUserId = async (id) => {
    const result = await notifications_model_1.NotificationModel.findOne({ userId: id });
    return result;
};
const updateNotificationByUserID = async (id, updatedData) => {
    const result = await notifications_model_1.NotificationModel.findOneAndUpdate({ userId: id }, updatedData, { new: true, runValidators: true });
    return result;
};
exports.notificationServices = {
    findNotificationByUserId,
    updateNotificationByUserID
};
//# sourceMappingURL=notifications.services.js.map