import { Router } from "express";
import { praivicyController } from "./privacy.controller";

const praivicyRouter = Router();

praivicyRouter.get("/get/:id" , praivicyController.getPraivacy);
praivicyRouter.patch("/update/:id" , praivicyController.updatePraivicy);

export default praivicyRouter;