"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const undo_controller_1 = require("./undo.controller");
const undoRouter = (0, express_1.Router)();
// create undo document
undoRouter.post("/create", undo_controller_1.createUndo);
// push new undo action (string id)
undoRouter.patch("/push", undo_controller_1.pushUndoAction);
// pop last undo action
undoRouter.patch("/pop", undo_controller_1.popUndoAction);
// get undo by userId + taskOrProjectId
undoRouter.get("/:userId/:taskOrProjectId", undo_controller_1.getUndo);
// create undo document
// undoRouter.post("globalUndoCreate", createGlobalUndo);
// push new undo action (string id)
undoRouter.patch("global/push", undo_controller_1.pushGlobalUndoAction);
// pop last undo action
undoRouter.patch("global/pop", undo_controller_1.popGlobalUndoAction);
// get undo by userId + taskOrProjectId
undoRouter.get("global/:userId", undo_controller_1.getGlobalUndo);
exports.default = undoRouter;
//# sourceMappingURL=undo.router.js.map