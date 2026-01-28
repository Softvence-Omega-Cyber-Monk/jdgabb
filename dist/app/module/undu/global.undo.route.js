"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const undo_controller_1 = require("./undo.controller");
const globalUndoRouter = (0, express_1.Router)();
globalUndoRouter.post("/globalUndoCreate", undo_controller_1.createGlobalUndo);
globalUndoRouter.patch("/global/push", undo_controller_1.pushGlobalUndoAction);
globalUndoRouter.patch("/global/pop", undo_controller_1.popGlobalUndoAction);
globalUndoRouter.get("/global/:userId", undo_controller_1.getGlobalUndo);
exports.default = globalUndoRouter;
//# sourceMappingURL=global.undo.route.js.map