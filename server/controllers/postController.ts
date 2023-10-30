import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import createError from "../util/createError";
import CONSTANT from "../constant";
import { RequestWithUser } from "../types/express";

const prisma = new PrismaClient();

const create = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { title, desc, category },
    user,
  } = req;

  if (!user)
    return next(
      createError(CONSTANT.ERROR_MESSAGE.NO_EXISTS_USER, CONSTANT.STATUS[401])
    );

  const newPost = await prisma.post.create({
    data: {
      title,
      desc,
      category,
      authorId: user.id,
    },
  });

  return res.status(200).json(newPost);
};

const fetch = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return res.status(200).json(posts);
};

const fetchById = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;

    // if(!id) next(createError(CONSTANT.ERROR_MESSAGE.))

    const post = await prisma.post.findUnique({
      where: { id },
    });
    return res.status(200).json(post);
  } catch (error) {
    return next(
      createError(CONSTANT.ERROR_MESSAGE.SERVER, CONSTANT.STATUS[500])
    );
  }
};

const edit = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
    body: { title, desc, category },
  } = req;
  try {
    const updatePost = await prisma.post.update({
      where: { id },
      data: { title, desc, category },
    });

    return res.status(200).json(updatePost);
  } catch (error) {
    return next(
      createError(CONSTANT.ERROR_MESSAGE.SERVER, CONSTANT.STATUS[500])
    );
  }
};

const remove = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
  } = req;
  try {
    const deletePost = await prisma.post.delete({ where: { id } });

    return res.status(200).json(deletePost);
  } catch (error) {
    return next(
      createError(CONSTANT.ERROR_MESSAGE.SERVER, CONSTANT.STATUS[500])
    );
  }
};

export default {
  create,
  fetch,
  edit,
  fetchById,
  remove,
};
