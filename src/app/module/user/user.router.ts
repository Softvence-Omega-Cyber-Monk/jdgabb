import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../utils/zodRequestValidation";
import { createUserValidationZodSchema } from "./user.validation";

const userRouter = Router();


userRouter.post("/register" , validateRequest(createUserValidationZodSchema) , userController.registerUser);

export default userRouter;