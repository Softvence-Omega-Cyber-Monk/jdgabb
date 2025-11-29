import { Router } from "express";
import { archiveController } from "./addToArchive.controller";

const archiveRouter = Router();

archiveRouter.post("/moveToArchive" , archiveController.addToArchive);
archiveRouter.delete("/deleteArchive" , archiveController.removeArchive);
archiveRouter.get("/getAllArchive/:id" , archiveController.getAllArchive);



export default archiveRouter;