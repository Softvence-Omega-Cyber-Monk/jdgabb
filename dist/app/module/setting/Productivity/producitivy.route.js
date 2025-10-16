"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producitivy_controller_1 = require("./producitivy.controller");
const producitivyRoute = (0, express_1.Router)();
producitivyRoute.get("/get/:id", producitivy_controller_1.productiviryController.getProducitivy);
producitivyRoute.patch("/update/:id", producitivy_controller_1.productiviryController.updatePraivicy);
exports.default = producitivyRoute;
//# sourceMappingURL=producitivy.route.js.map