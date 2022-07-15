import express from "express";
import userControllers from "../controllers/userController";

const userRoutes = express.Router();

// login method
userRoutes.post("/login", userControllers.login);
// register method
userRoutes.post("/register", userControllers.register);

export default userRoutes;
