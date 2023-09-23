import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

const prisma = new PrismaClient();

const signin = async (req: Request, res: Response) => {
  console.log(req.cookies);
  try {
    const {
      body: { email, password },
    } = req;

    if (!email || !password) {
      return res
        .status(500)
        .json({ message: "이메일과 비밀번호를 확인하세요" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(500)
        .json({ message: "이메일과 비밀번호를 확인하세요" });
    }

    const checkedPassword = bcrypt.compareSync(password, user.password);

    if (!checkedPassword) {
      return res
        .status(500)
        .json({ message: "이메일과 비밀번호를 확인하세요" });
    }

    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      // domain: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      userEmail: user.email,
      userNickname: user.nickname,
      refreshToken,
      accessToken,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "서버에러발생",
    });
  } finally {
    await prisma.$disconnect();
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const {
      body: { email, nickname, password, verifyPassword },
    } = req;

    if (!email || !nickname || !password || !verifyPassword) {
      return res.status(500).json({ message: "빈칸을 확인해주세요" });
    }

    if (password !== verifyPassword) {
      return res.status(500).json({ message: "비밀번호 확인이 틀렸습니다" });
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
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

const refresh = async (req: Request, res: Response) => {
  if (req.cookies.refreshToken) {
    try {
      const {
        cookies: { refreshToken },
      } = req;
      const verifiedJwt = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
        id: string;
        lat: number;
        exp: number;
      };

      if (!verifiedJwt.id) throw Error("인증안된토큰");

      const id = verifiedJwt.id;

      const newAccessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
      });
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) throw Error("인증안된유저");

      return res.json({
        accessToken: newAccessToken,
        userEmail: user?.email,
        userNickname: user?.nickname,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "서버에러발생" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.json(null);
  }
};
export default {
  signin,
  signup,
  refresh,
};
