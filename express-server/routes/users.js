import express from "express";
import { getUsers, register, login, logout } from "../controllers/users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

const userRouter = express.Router();

userRouter.get("/", verifyToken, getUsers);
userRouter.post("/", register);
userRouter.post("/login", login);
userRouter.get("/token", refreshToken);
userRouter.delete("/logout", logout);

export default userRouter;
