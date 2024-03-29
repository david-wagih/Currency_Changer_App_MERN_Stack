import express from "express";
import "dotenv/config";
import userRouter from "./router/userRouter";
import requireLogin from "./middlewares/requireLogin";
import connectDB from "./config/db";
import cors from "cors";
import FavoritesRouter from "./router/FavoritesRouter";

const app = express();

const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());

app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/favorites", FavoritesRouter);

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
