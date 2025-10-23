import { Router } from "express";
import { historyController } from "./hostory.controller";
import { userController } from "../user/user.controller";

const historyRoute = Router();

historyRoute.get("/get/:id" , historyController.getAllHistory)
historyRoute.post("/addUserChat", historyController.addUserChatToHistory);
historyRoute.patch("/addAiChatHistory" , historyController.addAIChatToHistory);

export default historyRoute;