"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const protect_1 = require("../../middleware/protect");
const authRouter = (0, express_1.Router)();
// Custom Jwt Login / Register
authRouter.post("/googleFirebase", auth_controller_1.authController.googleFirebaseLogin);
authRouter.post("/login", auth_controller_1.authController.loginUser);
authRouter.patch("/change-password", (0, protect_1.protectUser)(), auth_controller_1.authController.changePassword);
authRouter.post("/forgot-password", auth_controller_1.forgotPassword);
authRouter.post("/verify-otp", auth_controller_1.verifyOTP);
authRouter.post("/reset-password", auth_controller_1.resetPassword);
authRouter.patch("/delete/:id", (0, protect_1.protectUser)(), auth_controller_1.authController.deleteUser);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map