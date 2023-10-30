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
import CONSTANT from "./constant";
import posrtRouter from "./routes/postRouter";
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

app.use("/api/user", userRouter);
app.use("/api/post", posrtRouter);

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
