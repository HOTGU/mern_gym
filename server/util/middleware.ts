import { NextFunction, Response } from "express";
import jwt from "../libs/jwt";
import { PrismaClient } from "@prisma/client";
import CONSTANT from "../constant";
import createError from "./createError";
import { RequestWithUser } from "../types/express";

const onlyUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization)
    return next(
      createError(
        CONSTANT.ERROR_MESSAGE.NO_EXISTS_ACCESS_TOKEN,
        CONSTANT.STATUS[401]
      )
    );

  try {
    const token = req.headers.authorization.split(" ")[1]; //access token

    if (!token)
      return next(
        createError(
          CONSTANT.ERROR_MESSAGE.NO_EXISTS_ACCESS_TOKEN,
          CONSTANT.STATUS[401]
        )
      );

    const id = jwt.verifyAccessToken(token);

    if (!id)
      return next(
        createError(CONSTANT.ERROR_MESSAGE.ACCESS_TOKEN, CONSTANT.STATUS[401])
      );

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user)
      return next(
        createError(CONSTANT.ERROR_MESSAGE.NO_EXISTS_USER, CONSTANT.STATUS[401])
      );

    req.user = user;

    next();
  } catch (error: any) {
    return next(
      createError(CONSTANT.ERROR_MESSAGE.SERVER, CONSTANT.STATUS[500])
    );
  }
};

export default {
  onlyUser,
};
