import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { authController } from "./auth.controller";
import { protectUser } from "../../middleware/protect";

const authRouter = Router();

// Custom Jwt Login / Register


authRouter.post("/login" , authController.loginUser);
authRouter.patch("/change-password", protectUser() , authController.changePassword);
authRouter.patch("/delete/:id", protectUser() , authController.deleteUser)


// Google Login / Register
authRouter.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res , next);
});

authRouter.get("/google/callback", passport.authenticate("google" , {failureRedirect : "/login"}) ,authController.googleCallBackController);

export default authRouter;