"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const privacy_controller_1 = require("./privacy.controller");
const praivicyRouter = (0, express_1.Router)();
praivicyRouter.get("/get/:id", privacy_controller_1.praivicyController.getPraivacy);
praivicyRouter.patch("/update/:id", privacy_controller_1.praivicyController.updatePraivicy);
exports.default = praivicyRouter;
//# sourceMappingURL=privacy.route.js.map