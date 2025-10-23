"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const update_history_controller_1 = require("./update.history.controller");
const updateHistoryRoute = (0, express_1.Router)();
updateHistoryRoute.post("/createupdatehistory", update_history_controller_1.updateHistoryController.createChatHistory);
updateHistoryRoute.get("/find/history/:id", update_history_controller_1.updateHistoryController.findUserChat);
exports.default = updateHistoryRoute;
//# sourceMappingURL=update.history.route.js.map