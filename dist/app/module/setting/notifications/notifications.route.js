"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifications_controller_1 = require("./notifications.controller");
const notificationRouter = (0, express_1.Router)();
notificationRouter.get("/get/:id", notifications_controller_1.notificationController.getNotification);
notificationRouter.patch("/update/:id", notifications_controller_1.notificationController.updateNotification);
exports.default = notificationRouter;
//# sourceMappingURL=notifications.route.js.map