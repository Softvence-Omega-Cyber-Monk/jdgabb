"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const update_history_controller_1 = require("./update.history.controller");
const updateHistoryRoute = (0, express_1.Router)();
updateHistoryRoute.post("/createupdatehistory", update_history_controller_1.updateHistoryController.createChatHistory);
updateHistoryRoute.delete("/deleteUserChat/:userId/:chatType", update_history_controller_1.updateHistoryController.deleteUserChat);
updateHistoryRoute.get("/find/history/:id/:chatType", update_history_controller_1.updateHistoryController.findUserChat);
exports.default = updateHistoryRoute;
//# sourceMappingURL=update.history.route.js.map