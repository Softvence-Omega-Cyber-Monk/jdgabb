"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = require("./home.controller");
const homeRoute = (0, express_1.Router)();
homeRoute.get("/home", home_controller_1.homeTextController.getHomeText);
homeRoute.get("/goalText/:id", home_controller_1.homeTextController.generateProjectGoalText);
exports.default = homeRoute;
//# sourceMappingURL=home.route.js.map