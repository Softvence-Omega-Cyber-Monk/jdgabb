"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("./auth.controller");
const protect_1 = require("../../middleware/protect");
const authRouter = (0, express_1.Router)();
// Custom Jwt Login / Register
authRouter.post("/googleFirebase", auth_controller_1.authController.googleFirebaseLogin);
authRouter.post("/login", auth_controller_1.authController.loginUser);
authRouter.patch("/change-password", (0, protect_1.protectUser)(), auth_controller_1.authController.changePassword);
authRouter.patch("/delete/:id", (0, protect_1.protectUser)(), auth_controller_1.authController.deleteUser);
// Google Login / Register
authRouter.get("/google", async (req, res, next) => {
    passport_1.default.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});
authRouter.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), auth_controller_1.authController.googleCallBackController);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map