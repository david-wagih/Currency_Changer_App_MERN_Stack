import express from "express";
import "dotenv/config";
import userRouter from "./router/userRouter";
import requireLogin from "./middlewares/requireLogin";
import connectDB from "./config/db";

const app = express();

const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());

app.use("/api/users", userRouter);

app.use(requireLogin);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).send("Internal server error");
  }
);

app.listen(`${port}`, () => console.log(`listening to port ${port}`));
