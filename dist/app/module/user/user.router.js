"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const zodRequestValidation_1 = require("../../utils/zodRequestValidation");
const user_validation_1 = require("./user.validation");
const protect_1 = require("../../middleware/protect");
const user_interface_1 = require("./user.interface");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", (0, zodRequestValidation_1.validateRequest)(user_validation_1.createUserValidationZodSchema), user_controller_1.userController.registerUser);
userRouter.get("/searchTerm", user_controller_1.userController.searchUserByEmail);
userRouter.post("/project/share", user_controller_1.userController.addSharedUser);
userRouter.get("/shareWith/:userId", user_controller_1.userController.getUserSharedProjectsFull);
userRouter.get("/chatAccess/:userId", user_controller_1.userController.userChatAccessLimite);
userRouter.get("/info/:id", user_controller_1.userController.getSingleUser);
userRouter.get("/setting/:id", (0, protect_1.protectUser)(user_interface_1.Role.USER), user_controller_1.userController.userSettingInfo);
userRouter.delete("/delete/:id", user_controller_1.userController.userDeleted);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map