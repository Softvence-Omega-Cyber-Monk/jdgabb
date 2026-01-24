import { Router } from "express";
import {
    createUndo,
    getUndo,
    pushUndoAction,
    popUndoAction,
    createGlobalUndo,
    pushGlobalUndoAction,
    popGlobalUndoAction,
    getGlobalUndo,
} from "./undo.controller";

const undoRouter = Router();

// create undo document
undoRouter.post("/create", createUndo);

// push new undo action (string id)
undoRouter.patch("/push", pushUndoAction);

// pop last undo action
undoRouter.patch("/pop", popUndoAction);

// get undo by userId + taskOrProjectId
undoRouter.get("/:userId/:taskOrProjectId", getUndo);


// create undo document
// undoRouter.post("globalUndoCreate", createGlobalUndo);


// push new undo action (string id)
undoRouter.patch("global/push", pushGlobalUndoAction);


// pop last undo action
undoRouter.patch("global/pop", popGlobalUndoAction);


// get undo by userId + taskOrProjectId
undoRouter.get("global/:userId", getGlobalUndo);



export default undoRouter;
