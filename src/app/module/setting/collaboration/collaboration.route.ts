import { Router } from "express";
import { collaborationController } from "./collaboration.controller";

const collabrationRoute = Router();

collabrationRoute.get("/get/:id" , collaborationController.getCollabration);
collabrationRoute.patch("/update/:id" , collaborationController.updateCollabration);


export default collabrationRoute;
