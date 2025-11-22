import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { authController } from "./auth.controller";
import { protectUser } from "../../middleware/protect";

const authRouter = Router();

// Custom Jwt Login / Register

authRouter.post("/googleFirebase" , authController.googleFirebaseLogin)
authRouter.post("/login" , authController.loginUser);
authRouter.patch("/change-password", protectUser() , authController.changePassword);
authRouter.patch("/delete/:id", protectUser() , authController.deleteUser)



export default authRouter;