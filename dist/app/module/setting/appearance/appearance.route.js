"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appearance_controller_1 = require("./appearance.controller");
const appearanceRouter = (0, express_1.Router)();
appearanceRouter.get("/get/:id", appearance_controller_1.appearanceController.getAppearanceByuUserId);
appearanceRouter.patch("/update/:id", appearance_controller_1.appearanceController.updateAppearanceByUserID);
exports.default = appearanceRouter;
//# sourceMappingURL=appearance.route.js.map