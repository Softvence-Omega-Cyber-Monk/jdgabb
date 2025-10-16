"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectTask_controller_1 = require("./projectTask.controller");
const projectTaskRouter = (0, express_1.Router)();
projectTaskRouter.get("/get/:id", projectTask_controller_1.projectTaskController.getPraivacy);
projectTaskRouter.patch("/update/:id", projectTask_controller_1.projectTaskController.updatePraivicy);
exports.default = projectTaskRouter;
//# sourceMappingURL=projectTask.route.js.map