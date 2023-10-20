import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "../libs/jwt";
import oauth from "../libs/oauth";
import createError from "../util/createError";
import CONSTANT from "../constant";
dotenv.config();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

const CLINET_URL =
  process.env.NODE_ENV === "production"
    ? "https://modong.co.kr"
    : "http://localhost:3000";

const prisma = new PrismaClient();

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { email, password },
    } = req;

    if (!email || !password) {
      return next(
        createError(CONSTANT.ERROR_MESSAGE.REQUIRED_INPUT, CONSTANT.STATUS[500])
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return next(
        createError(CONSTANT.ERROR_MESSAGE.SIGNIN_ERROR, CONSTANT.STATUS[500])
      );
    }

    if (user.provider !== "LOCAL") {
      return next(
        createError(`${user.provider}(으)로 가입한 이메일입니다`, 500)
      );
    }

    const checkedPassword = bcrypt.compareSync(
      password,
      user.password as string
    );

    if (!checkedPassword) {
      return next(
        createError(CONSTANT.ERROR_MESSAGE.SIGNIN_ERROR, CONSTANT.STATUS[500])
      );
    }

    const accessToken = jwt.signAccessToken(user.id);

    const refreshToken = jwt.signRefreshToken();

    await prisma.user.update({
      where: { email },
      data: {
        refreshToken,
        provider: "LOCAL",
      },
    });

    res.cookie("refreshToken", refreshToken, {
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      // domain: "/",
      maxAge: 1000 * 60 * 60 * 24 * 14,
    });

    return res.status(200).json({
      userEmail: user.email,
      userNickname: user.nickname,
      refreshToken,
      accessToken,
    });
  } catch (error) {
    console.log(error);

    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { email, nickname, password, verifyPassword },
    } = req;

    if (!email || !nickname || !password || !verifyPassword) {
      return next(
        createError(CONSTANT.ERROR_MESSAGE.REQUIRED_INPUT, CONSTANT.STATUS[500])
      );
    }

    if (password !== verifyPassword) {
      return next(
        createError(
          CONSTANT.ERROR_MESSAGE.UNMATCH_VERIFY_PASSWORD,
          CONSTANT.STATUS[500]
        )
      );
    }

    const existsUser = await prisma.user.findUnique({ where: { email } });

    if (existsUser) {
      return next(
        createError(CONSTANT.ERROR_MESSAGE.EXISTS_EMAIL, CONSTANT.STATUS[500])
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        nickname,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.refreshToken) {
    try {
      const {
        cookies: { refreshToken },
      } = req;

      const verifyRefreshToken = jwt.verifyRefreshToken(refreshToken);

      if (!verifyRefreshToken) {
        return next(
          createError(
            CONSTANT.ERROR_MESSAGE.REFRESH_TOKEN,
            CONSTANT.STATUS[403]
          )
        );
      }

      const user = await prisma.user.findFirst({ where: { refreshToken } });

      if (!user) {
        return next(
          createError(
            CONSTANT.ERROR_MESSAGE.REFRESH_TOKEN,
            CONSTANT.STATUS[403]
          )
        );
      }

      const newAccessToken = jwt.signAccessToken(user.id);
      const newRefreshToken = jwt.signRefreshToken();

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
      });

      res.cookie("refreshToken", newRefreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.json({
        accessToken: newAccessToken,
        userEmail: user?.email,
        userNickname: user?.nickname,
      });
    } catch (error: any) {
      return next(error);
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.json(null);
  }
};

const google = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      throw Error("no code");
    }

    const { id_token, access_token } = await oauth.getGoogleToken({ code });

    const googleUser = await oauth.getGoogleUser({ id_token, access_token });

    const refreshToken = jwt.signRefreshToken();

    const existsUser = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (existsUser) {
      await prisma.user.update({
        where: { id: existsUser.id },
        data: { provider: "GOOGLE", providerId: googleUser.id, refreshToken },
      });
    } else {
      await prisma.user.create({
        data: {
          email: googleUser.email,
          nickname: googleUser.name,
          provider: "GOOGLE",
          providerId: googleUser.id,
          refreshToken,
        },
      });
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    });

    return res.redirect(`${CLINET_URL}${req.query.state}`);
  } catch (error) {
    return res.redirect("http://localhost:3000/oauthError");
  }
};

const kakao = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    throw Error("no code");
  }

  try {
    const { access_token } = await oauth.getKakaoToken({ code });

    const kakaoUser = await oauth.getKakaoUser({
      access_token,
    });

    const providerId = String(kakaoUser.id);
    const nickname = kakaoUser.kakao_account.profile.nickname;
    const refreshToken = jwt.signRefreshToken();
    const email = kakaoUser.kakao_account.email || undefined;

    // kakao 로그인은 email을 못받아 provider id로 exists를 한다
    const existsUser = await prisma.user.findFirst({ where: { providerId } });

    if (existsUser) {
      await prisma.user.update({
        where: { id: existsUser.id },
        data: { email, nickname, refreshToken },
      });
    } else {
      // kakao 로그인은 email을 받지 못할 수 있어 따로 한 번 더 검사해준다
      if (email) {
        const existsEmailUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existsEmailUser) {
          await prisma.user.update({
            where: { id: existsEmailUser.id },
            data: { provider: "KAKAO", providerId, refreshToken },
          });
        }
      }

      await prisma.user.create({
        data: {
          email,
          nickname,
          provider: "KAKAO",
          providerId,
          refreshToken,
        },
      });
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    });

    return res.redirect(`${CLINET_URL}${req.query.state}`);
  } catch (error) {
    console.log(error);
    return res.redirect(`${CLINET_URL}/oauthError`);
  }
};

export default {
  signin,
  signup,
  refresh,
  google,
  kakao,
};
