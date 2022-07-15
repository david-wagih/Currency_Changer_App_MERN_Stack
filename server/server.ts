import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes";

const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/users", userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
