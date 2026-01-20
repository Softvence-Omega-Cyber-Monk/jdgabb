import { Router } from "express";
import { createUpdateHistoryController, deleteMultipleUpdateHistoryController, getUpdateHistoryController } from "./ProjectChatHistoryController";

const ProjectChatHisotryRouter = Router();


ProjectChatHisotryRouter.post("/create", createUpdateHistoryController);

ProjectChatHisotryRouter.get("/getProjectChat/:userId/:projectOrTaskId/:chatType", getUpdateHistoryController);
ProjectChatHisotryRouter.delete("/deleteProjectChat/:userId/:projectOrTaskId/:chatType", deleteMultipleUpdateHistoryController);


export default ProjectChatHisotryRouter;