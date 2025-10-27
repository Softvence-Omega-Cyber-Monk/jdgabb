import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../utils/zodRequestValidation";
import { createUserValidationZodSchema } from "./user.validation";
import { protectUser } from "../../middleware/protect";
import { Role } from "./user.interface";

const userRouter = Router();


userRouter.post("/register", validateRequest(createUserValidationZodSchema), userController.registerUser);
userRouter.get("/searchTerm", userController.searchUserByEmail);
userRouter.post("/project/share", userController.addSharedUser);
userRouter.get("/shareWith/:userId" , userController.getUserSharedProjectsFull)
userRouter.get("/info/:id", userController.getSingleUser);
userRouter.get("/setting/:id", protectUser(Role.USER), userController.userSettingInfo);
userRouter.delete("/delete/:id", userController.userDeleted)
export default userRouter;