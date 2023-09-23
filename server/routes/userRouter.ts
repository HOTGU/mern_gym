import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signin", userController.signin);

userRouter.post("/signup", userController.signup);

userRouter.post("/refresh", userController.refresh);

export default userRouter;
