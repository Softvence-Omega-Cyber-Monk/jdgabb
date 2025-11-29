import { Router } from "express";
import { languageController } from "./language.controller";
import { trashController } from "../../taskTrash/trash.controller";

const languageRouter = Router();

languageRouter.post("/taskTrash", trashController.addTaskToTrash);
languageRouter.delete("/removeTrash" , trashController.trashRemove);
languageRouter.get("/find/:id" , trashController.getAllTrash);
languageRouter.get("/get/:id", languageController.getLanguage);
languageRouter.patch("/update/:id", languageController.updateLanguage);


export default languageRouter;
