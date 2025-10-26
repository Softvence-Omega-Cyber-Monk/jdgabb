"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbot_controller_1 = require("./chatbot.controller");
const checkChatAccess_1 = require("../../middleware/checkChatAccess");
const chatbotRouter = (0, express_1.Router)();
chatbotRouter.post("/chatbot", checkChatAccess_1.checkChatAccess, chatbot_controller_1.AichatBotController.chatbot);
exports.default = chatbotRouter;
//# sourceMappingURL=chatbot.route.js.map