import { Router } from "express";
import {  createProjectController, createTaskController, createTaskOrSubtaskController, deleteTaskController, getAllParentTasks, getProjectController, getSingleTask, getSingleUserAllProject, getTaskFlagList, getTaskParentChainController, getTaskWithChildren, projectDelete, projectGoalUpdate, updateTaskController } from "./UpdateProjectController";

const UpdateProjectRouter = Router();

UpdateProjectRouter.post("/createProject", createProjectController);
UpdateProjectRouter.post("/createSubtaskUnerTaskOrSubtask", createTaskOrSubtaskController)
UpdateProjectRouter.get("/getProject/:projectId", getProjectController);
UpdateProjectRouter.post("/:projectId/tasks", createTaskController);
UpdateProjectRouter.delete("/:taskId/deletetask", deleteTaskController);

UpdateProjectRouter.get("/parentTaskIdChain/:taskId", getTaskParentChainController);


UpdateProjectRouter.patch("/updateprojectGoal/:projectId", projectGoalUpdate);
UpdateProjectRouter.delete("/deleteProject/:projectId", projectDelete)
UpdateProjectRouter.get("/getTaskFlagList/:userId", getTaskFlagList)
UpdateProjectRouter.get("/findSingleTask/:taskId" , getSingleTask)
UpdateProjectRouter.patch("/update/tasks/:taskId", updateTaskController);
UpdateProjectRouter.get("/tasks/:taskId/parents/:projectId", getAllParentTasks);
UpdateProjectRouter.get("/tasks/child/:taskId", getTaskWithChildren);
UpdateProjectRouter.get("/all/project/:userId", getSingleUserAllProject);
export default UpdateProjectRouter;