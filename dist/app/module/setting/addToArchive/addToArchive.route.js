"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addToArchive_controller_1 = require("./addToArchive.controller");
const archiveRouter = (0, express_1.Router)();
archiveRouter.post("/moveToArchive", addToArchive_controller_1.archiveController.addToArchive);
archiveRouter.delete("/deleteArchive", addToArchive_controller_1.archiveController.removeArchive);
archiveRouter.get("/getAllArchive/:id", addToArchive_controller_1.archiveController.getAllArchive);
exports.default = archiveRouter;
//# sourceMappingURL=addToArchive.route.js.map