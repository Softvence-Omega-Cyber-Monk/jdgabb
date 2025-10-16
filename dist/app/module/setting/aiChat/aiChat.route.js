"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiChat_controller_1 = require("./aiChat.controller");
const aiChatRouter = (0, express_1.Router)();
aiChatRouter.get("/get/:id", aiChat_controller_1.chatController.getAiChatByUserId);
aiChatRouter.patch("/update/:id", aiChat_controller_1.chatController.updateAiChat);
exports.default = aiChatRouter;
//# sourceMappingURL=aiChat.route.js.map