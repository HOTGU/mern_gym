import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import userRouter from "./routes/userRouter";
import { PrismaClient } from "@prisma/client";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api/test",
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
      return res.status(401).json({ message: "인증헤더가 없음" });

    const token = req.headers.authorization.split(" ")[1]; //access token

    // return res.status(401).json({ message: "인증토큰이 없음" });
    if (!token) return res.status(401).json({ message: "인증토큰이 없음" });

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as { id: string; lat: number; lng: number };

    if (!decoded)
      return res.status(401).json({ message: "허가된 토큰이 아님" });

    try {
      const prisma = new PrismaClient();

      const user = await prisma.user.findUnique({ where: { id: decoded.id } });

      //@ts-ignore
      req.user = user;

      next();
    } catch (error) {
      return res.status(500).json({ message: "서버 오류" });
    }
  },
  (req: Request, res: Response) => {
    //@ts-ignore
    console.log(req.user);

    //@ts-ignore

    res.status(200).json(req.user);
  }
);

app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
