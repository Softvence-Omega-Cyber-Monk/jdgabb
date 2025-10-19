import { Router } from "express";
import { projectController } from "./project.controller";

const projectRouter = Router();



projectRouter.patch("/addTask", projectController.addTask);
projectRouter.patch("/addSubTask", projectController.addSubTask);
projectRouter.patch("/addDetails", projectController.addDetails);
projectRouter.get("/get/:id", projectController.getProject);
projectRouter.post("/create/:id", projectController.createProject);
projectRouter.post("/chat" , projectController.askQuestion);

export default projectRouter;