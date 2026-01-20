import { Router } from "express";
import { createProjectController, createTaskController, createTaskOrSubtaskController, deleteTaskController, getAllParentTasks, getProjectController, getSingleUserAllProject, getTaskWithChildren, updateTaskController } from "./UpdateProjectController";

const UpdateProjectRouter = Router();

UpdateProjectRouter.post("/createProject", createProjectController);
UpdateProjectRouter.post("/createSubtaskUnerTaskOrSubtask", createTaskOrSubtaskController)
UpdateProjectRouter.get("/getProject/:projectId", getProjectController);
UpdateProjectRouter.post("/:projectId/tasks", createTaskController);
UpdateProjectRouter.delete("/:taskId/deletetask", deleteTaskController);
UpdateProjectRouter.patch("/update/tasks/:taskId", updateTaskController);
UpdateProjectRouter.get("/tasks/:taskId/parents/:projectId", getAllParentTasks);
UpdateProjectRouter.get("/tasks/child/:taskId", getTaskWithChildren);
UpdateProjectRouter.get("/all/project/:userId", getSingleUserAllProject);
export default UpdateProjectRouter;