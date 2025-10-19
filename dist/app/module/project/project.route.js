"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const projectRouter = (0, express_1.Router)();
projectRouter.patch("/addTask", project_controller_1.projectController.addTask);
projectRouter.patch("/addSubTask", project_controller_1.projectController.addSubTask);
projectRouter.patch("/addDetails", project_controller_1.projectController.addDetails);
projectRouter.get("/get/:id", project_controller_1.projectController.getProject);
projectRouter.post("/create/:id", project_controller_1.projectController.createProject);
projectRouter.post("/chat", project_controller_1.projectController.askQuestion);
exports.default = projectRouter;
//# sourceMappingURL=project.route.js.map