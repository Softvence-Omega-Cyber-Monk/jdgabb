import { Router } from "express";
import { chatController } from "./aiChat.controller";

const aiChatRouter = Router();

aiChatRouter.get("/get/:id" , chatController.getAiChatByUserId);
aiChatRouter.patch("/update/:id" , chatController.updateAiChat);

export default aiChatRouter;