"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collaboration_controller_1 = require("./collaboration.controller");
const collabrationRoute = (0, express_1.Router)();
collabrationRoute.get("/get/:id", collaboration_controller_1.collaborationController.getCollabration);
collabrationRoute.patch("/update/:id", collaboration_controller_1.collaborationController.updateCollabration);
exports.default = collabrationRoute;
//# sourceMappingURL=collaboration.route.js.map