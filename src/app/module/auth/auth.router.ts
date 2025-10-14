import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { authController } from "./auth.controller";

const authRouter = Router();

// Custom Jwt Login / Register


authRouter.post("/login" , authController.loginUser);


// Google Login / Register
authRouter.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res , next);
});

authRouter.get("/google/callback", passport.authenticate("google" , {failureRedirect : "/login"}) ,authController.googleCallBackController);

export default authRouter;