import { Router } from "express";
import { notificationController } from "./notifications.controller";

const notificationRouter = Router();

notificationRouter.get("/get/:id" , notificationController.getNotification);
notificationRouter.patch("/update/:id" , notificationController.updateNotification);

export default notificationRouter;
