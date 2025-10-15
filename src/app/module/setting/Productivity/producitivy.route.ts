import { Router } from "express";
import { productiviryController } from "./producitivy.controller";

const producitivyRoute = Router();

producitivyRoute.get("/get/:id" , productiviryController.getProducitivy);
producitivyRoute.patch("/update/:id" , productiviryController.updatePraivicy);


export default producitivyRoute;