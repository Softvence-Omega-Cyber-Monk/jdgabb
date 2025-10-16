import { Router } from "express";
import { projectController } from "./project.controller";

const projectRouter = Router();


projectRouter.post("/create/:id", projectController.createProject);
projectRouter.patch("/addTask", projectController.addTask);
projectRouter.patch("/addSubTask", projectController.addSubTask);
projectRouter.patch("/addDetails" , projectController.addDetails)

export default projectRouter;