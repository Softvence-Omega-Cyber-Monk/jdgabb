import { Router } from "express";
import { languageController } from "./language.controller";

const languageRouter = Router();

languageRouter.get("/get/:id" , languageController.getLanguage);
languageRouter.patch("/update/:id" , languageController.updateLanguage);


export default languageRouter;
