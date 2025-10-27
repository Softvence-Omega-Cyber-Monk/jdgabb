"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/notification.routes.ts
const express_1 = require("express");
const firebaseNotifacation_controller_1 = require("./firebaseNotifacation.controller");
const firebaseNotificationRouter = (0, express_1.Router)();
firebaseNotificationRouter.post("/create", firebaseNotifacation_controller_1.firebaseNotifacationController.createNotification);
firebaseNotificationRouter.get("/getAllNtg", firebaseNotifacation_controller_1.firebaseNotifacationController.getUserNotifications);
firebaseNotificationRouter.patch("/markAsRead/:id/read", firebaseNotifacation_controller_1.firebaseNotifacationController.markAsRead);
exports.default = firebaseNotificationRouter;
//# sourceMappingURL=firebaseNotification.route.js.map