import { Router } from "express";
import { updateHistoryController } from "./update.history.controller";

const updateHistoryRoute = Router();

updateHistoryRoute.post("/createupdatehistory", updateHistoryController.createChatHistory);
updateHistoryRoute.delete("/deleteUserChat/:userId", updateHistoryController.deleteUserChat);
updateHistoryRoute.get("/find/history/:id/:chatType", updateHistoryController.findUserChat);


export default updateHistoryRoute;