import express from "express";

import postController from "../controllers/postController";
import middleware from "../util/middleware";

const postRouter = express.Router();

postRouter.post("/", middleware.onlyUser, postController.create);
postRouter.get("/", postController.fetch);
postRouter.put("/:id", postController.edit);
postRouter.get("/:id", postController.fetchById);
postRouter.delete("/:id", postController.remove);

export default postRouter;
