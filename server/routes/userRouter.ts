import express from "express";

import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signin", userController.signin);

userRouter.post("/signup", userController.signup);

userRouter.post("/refresh", userController.refresh);

userRouter.get("/oauth/google", userController.google);
userRouter.get("/oauth/kakao", userController.kakao);

export default userRouter;
