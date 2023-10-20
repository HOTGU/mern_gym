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

import userRouter from "./routes/userRouter";
import { PrismaClient } from "@prisma/client";
import jwt from "./libs/jwt";
import CONSTANT from "./constant";

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

    try {
      const token = req.headers.authorization.split(" ")[1]; //access token

      if (!token) return res.status(401).json({ message: "인증토큰이 없음" });

      const id = jwt.verifyAccessToken(token);

      if (!id)
        return res.status(403).json({ message: "no verified access token" });

      const prisma = new PrismaClient();

      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return res.status(403).json({ message: "no exists user" });
      }

      //@ts-ignore
      req.user = user;

      next();
    } catch (error: any) {
      return res.status(500).json({ message: "서버 오류" });
    }
  },
  (req: Request, res: Response) => {
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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const message = err.message || CONSTANT.ERROR_MESSAGE.SERVER;
  const status = err.status || CONSTANT.STATUS[500];
  return res.status(status).json({ message });
});
