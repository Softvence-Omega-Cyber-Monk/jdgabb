"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hostory_controller_1 = require("./hostory.controller");
const historyRoute = (0, express_1.Router)();
historyRoute.get("/get/:id", hostory_controller_1.historyController.getAllHistory);
historyRoute.post("/addUserChat", hostory_controller_1.historyController.addUserChatToHistory);
historyRoute.patch("/addAiChatHistory", hostory_controller_1.historyController.addAIChatToHistory);
exports.default = historyRoute;
//# sourceMappingURL=history.route.js.map