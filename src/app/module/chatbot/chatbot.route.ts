import { Router } from "express";
import { AichatBotController } from "./chatbot.controller";


const chatbotRouter = Router();

chatbotRouter.post("/chatbot" , AichatBotController.chatbot)

export default chatbotRouter;