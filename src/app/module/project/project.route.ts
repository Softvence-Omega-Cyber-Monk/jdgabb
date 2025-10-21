import { Router } from "express";
import { projectController } from "./project.controller";

const projectRouter = Router();


projectRouter.get("/getSingletask", projectController.findSingleTask);
projectRouter.patch("/addTask", projectController.addTask);
projectRouter.get("/getAll", projectController.getAllProject);
projectRouter.patch("/updateTaskStar" , projectController.updateTaskStar);
projectRouter.patch("/updateSubTaskStar" , projectController.updateSubtaskStar);
projectRouter.patch("/addSubTask", projectController.addSubTask);
projectRouter.patch("/addDetails", projectController.addDetails);
projectRouter.patch("/answer", projectController.ansQuestion);
projectRouter.post("/openAi", projectController.askQuestionOpenAi);
projectRouter.get("/get/:id", projectController.getProject);
projectRouter.post("/create/:id", projectController.createProject);
projectRouter.post("/askQuestion/:id", projectController.askQuestion);


export default projectRouter;