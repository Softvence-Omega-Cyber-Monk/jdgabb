import { Router } from "express";
import { projectController } from "./project.controller";
import { checkChatAccess } from "../../middleware/checkChatAccess";

const projectRouter = Router();


projectRouter.get("/getSingletask", projectController.findSingleTask);
projectRouter.patch("/addTask", projectController.addTask);
projectRouter.get("/getAll", projectController.getAllProject);
projectRouter.patch("/updateTaskStar", projectController.updateTaskStar);
projectRouter.patch("/updateSubTaskStar", projectController.updateSubtaskStar);
projectRouter.patch("/addSubTask", projectController.addSubTask);
projectRouter.patch("/addDetails", projectController.addDetails);
projectRouter.post("/generateTitle", checkChatAccess, projectController.createProjectWithAi);
projectRouter.patch("/answer", projectController.ansQuestion);
projectRouter.get("/findSingleSubTask", projectController.findSingleSubtask);
projectRouter.delete("/deleteTask", projectController.permanentDeleteTask);
projectRouter.patch("/update/task_with_ai", checkChatAccess, projectController.updateTaskWithAi);
projectRouter.delete("/delete/suTask", projectController.permanentDeleteSubTask);
projectRouter.patch("/update/taskDate", projectController.updateTaskDueDateController);

// Update Work
projectRouter.post("/collabration-access-Project", projectController.collabrationProjectGiveAccess);
projectRouter.patch("/projectGoalUpdate", projectController.updateProjectGoal)
projectRouter.patch("/updateTaskTitle", projectController.updateTaskTitle);
projectRouter.patch("/updateSubtaskTitleDueDate", projectController.updateSubtaskTitleAbdDueDate);
projectRouter.patch("/removeAccessFormOwnProject" , projectController.removeUserFromProject);
projectRouter.get("/seeProjectAccessUser/:projectId" , projectController.seeProjectAccessUser)
projectRouter.post("/createFullProject/:userId", projectController.createFullProjectManualy);
projectRouter.patch("/updateFullProjectAnyWhere/:projectId", projectController.updateFullProjectAnyWhereProject);
projectRouter.delete("/deleteProject/:projectId", projectController.deleteProject);


// End Update Work

projectRouter.post("/createtTaskSubTaskWithAi/:id", checkChatAccess, projectController.createProjectTaskSubtaskWithAi);
projectRouter.get("/get/:id", projectController.getProject);
projectRouter.get("/user/project/:id", projectController.getAllProjectByUser);
projectRouter.post("/create/:id", projectController.createProject);
projectRouter.get("/askQuestion/:id", checkChatAccess, projectController.askQuestion);
projectRouter.patch("/update/title/:id", checkChatAccess, projectController.updateProjectTitle);
projectRouter.get("/starred-tasks/:userId", projectController.getStarredTasks);
projectRouter.get("/completed-tasks/:projectId", projectController.getCompletedTasks);
projectRouter.get("/askQuestionAiNotHistory/:id", checkChatAccess, projectController.askQuestionNotHistory);


export default projectRouter;