import { Router } from "express";
import { signup, login } from "./user.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isValid } from "../../middleware/validation.js";
import { signUpVal, loginVal } from "./user.validation.js";

const userRouter = Router();

// Sign up
userRouter.post('/signup', isValid(signUpVal), asyncHandler(signup));

// Login
userRouter.post('/login', isValid(loginVal), asyncHandler(login));

export default userRouter;
