import { Router } from "express";
import { notificationMsgController } from "./notificationMsg.controller";

const notificationMsgRoutes = Router();

notificationMsgRoutes.get("/getAllNotification/:id", notificationMsgController.getAllNotification);

export default notificationMsgRoutes;