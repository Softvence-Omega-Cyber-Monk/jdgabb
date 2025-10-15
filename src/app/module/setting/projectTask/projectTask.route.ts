import { Router } from "express";
import { projectTaskController } from "./projectTask.controller";


const projectTaskRouter = Router();

projectTaskRouter.get("/get/:id" , projectTaskController.getPraivacy);
projectTaskRouter.patch("/update/:id" , projectTaskController.updatePraivicy);

export default projectTaskRouter;