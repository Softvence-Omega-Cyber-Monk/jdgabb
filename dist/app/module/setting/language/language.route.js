"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const language_controller_1 = require("./language.controller");
const languageRouter = (0, express_1.Router)();
languageRouter.get("/get/:id", language_controller_1.languageController.getLanguage);
languageRouter.patch("/update/:id", language_controller_1.languageController.updateLanguage);
exports.default = languageRouter;
//# sourceMappingURL=language.route.js.map