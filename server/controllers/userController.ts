import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

// const SALT_ROUND = parseInt(process.env.SALT_ROUND);

const signin = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
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

export default {
  signin,
  signup,
};
