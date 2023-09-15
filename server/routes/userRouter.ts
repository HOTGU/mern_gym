import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signin", userController.signin);

userRouter.post("/signup", userController.signup);

export default userRouter;
