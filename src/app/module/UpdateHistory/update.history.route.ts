import { Router } from "express";
import { updateHistoryController } from "./update.history.controller";

const updateHistoryRoute = Router();

updateHistoryRoute.post("/createupdatehistory" , updateHistoryController.createChatHistory);
updateHistoryRoute.get("/find/history/:id" , updateHistoryController.findUserChat);


export default updateHistoryRoute;