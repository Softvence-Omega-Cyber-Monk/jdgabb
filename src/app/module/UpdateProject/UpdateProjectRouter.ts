import { Router } from "express";
import { createProjectController, createTaskController, createTaskOrSubtaskController, deleteTaskController, getProjectController, updateTaskController } from "./UpdateProjectController";

const UpdateProjectRouter = Router();

UpdateProjectRouter.post("/createProject", createProjectController);
UpdateProjectRouter.post("/createSubtaskUnerTaskOrSubtask", createTaskOrSubtaskController)
UpdateProjectRouter.get("/getProject/:projectId", getProjectController);
UpdateProjectRouter.post("/:projectId/tasks", createTaskController);
UpdateProjectRouter.delete("/:taskId/deletetask", deleteTaskController);
UpdateProjectRouter.patch("/update/tasks/:taskId", updateTaskController);

export default UpdateProjectRouter;