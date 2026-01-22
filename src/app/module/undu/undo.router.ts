import { Router } from "express";
import {
  createUndo,
  getUndo,
  pushUndoAction,
  popUndoAction,
} from "./undo.controller";

const undoRouter = Router();

// create undo document
undoRouter.post("/create", createUndo);

// get undo by userId + taskOrProjectId
undoRouter.get("/:userId/:taskOrProjectId", getUndo);

// push new undo action (string id)
undoRouter.patch("/push", pushUndoAction);

// pop last undo action
undoRouter.patch("/pop", popUndoAction);

export default undoRouter;
