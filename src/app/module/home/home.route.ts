import { Router } from "express";
import { homeTextController } from "./home.controller";

const homeRoute = Router();


homeRoute.get("/home", homeTextController.getHomeText);
homeRoute.get("/goalText/:id", homeTextController.generateProjectGoalText);



export default homeRoute;