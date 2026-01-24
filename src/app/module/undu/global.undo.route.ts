import { Router } from "express";
import { createGlobalUndo, getGlobalUndo, popGlobalUndoAction, pushGlobalUndoAction } from "./undo.controller";

const globalUndoRouter = Router();



globalUndoRouter.post("/globalUndoCreate", createGlobalUndo)
globalUndoRouter.patch("/global/push", pushGlobalUndoAction);
globalUndoRouter.patch("/global/pop", popGlobalUndoAction);
globalUndoRouter.get("/global/:userId", getGlobalUndo);


export default globalUndoRouter;