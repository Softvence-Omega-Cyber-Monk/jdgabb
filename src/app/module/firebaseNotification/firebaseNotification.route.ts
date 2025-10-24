// src/routes/notification.routes.ts
import { Router } from "express";
import { firebaseNotifacationController } from "./firebaseNotifacation.controller";

const firebaseNotificationRouter = Router();

firebaseNotificationRouter.post("/create", firebaseNotifacationController.createNotification);
firebaseNotificationRouter.get("/getAll/:userId", firebaseNotifacationController.getUserNotifications);
firebaseNotificationRouter.patch("/markAsRead/:id/read", firebaseNotifacationController.markAsRead);

export default firebaseNotificationRouter