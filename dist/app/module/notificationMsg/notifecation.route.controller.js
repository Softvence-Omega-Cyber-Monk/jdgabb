"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationMsg_controller_1 = require("./notificationMsg.controller");
const notificationMsgRoutes = (0, express_1.Router)();
notificationMsgRoutes.get("/getAllNotification/:id", notificationMsg_controller_1.notificationMsgController.getAllNotification);
exports.default = notificationMsgRoutes;
//# sourceMappingURL=notifecation.route.controller.js.map