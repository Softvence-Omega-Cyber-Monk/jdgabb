"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const projectRouter = (0, express_1.Router)();
projectRouter.post("/create/:id", project_controller_1.projectController.createProject);
projectRouter.patch("/addTask", project_controller_1.projectController.addTask);
projectRouter.patch("/addSubTask", project_controller_1.projectController.addSubTask);
projectRouter.patch("/addDetails", project_controller_1.projectController.addDetails);
exports.default = projectRouter;
//# sourceMappingURL=project.route.js.map