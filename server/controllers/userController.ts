import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";

// so to test the login function go to the URL http://localhost:8000/api/users/login

const login = async (req: express.Request, res: express.Response) => {
  const user = new UserModel(req.body);
  try {
    const u = await UserModel.findOne({
      username: user.username,
    });
    if (u) {
      if (u.password === user.password) {
        var token = jwt.sign({ user: u }, String(process.env.TOKEN_SECRET));
        res.json(token);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "User not found, Create new one" });
    }
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const register = async (req: express.Request, res: express.Response) => {
  try {
    const newUser = await UserModel.create({
      username: req.body.username,
      password: req.body.password,
    });
    if (newUser) {
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

export default { login, register };
