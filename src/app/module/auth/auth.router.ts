import { Router } from "express";
import { authController, forgotPassword, resetPassword, verifyOTP } from "./auth.controller";
import { protectUser } from "../../middleware/protect";

const authRouter = Router();

// Custom Jwt Login / Register

authRouter.post("/googleFirebase", authController.googleFirebaseLogin)
authRouter.post("/login", authController.loginUser);
authRouter.patch("/change-password", protectUser(), authController.changePassword);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);
authRouter.patch("/delete/:id", protectUser(), authController.deleteUser)



export default authRouter;