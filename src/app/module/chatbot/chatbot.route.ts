import { Router } from "express";
import { AichatBotController } from "./chatbot.controller";
import { checkChatAccess } from "../../middleware/checkChatAccess";


const chatbotRouter = Router();

chatbotRouter.post("/chatbot" , checkChatAccess , AichatBotController.chatbot)

export default chatbotRouter;