import { Router } from "express";
import { appearanceController } from "./appearance.controller";

const appearanceRouter = Router();

appearanceRouter.get("/get/:id" , appearanceController.getAppearanceByuUserId);
appearanceRouter.patch("/update/:id" , appearanceController.updateAppearanceByUserID);



export default appearanceRouter;