import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import chatroomsRouter from "./routes/chatrooms";

dotenv.config();

const app = express();

/**
 * express 설정
 */
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

/**
 * API 라우팅
 */
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/chatrooms", chatroomsRouter);

export default app;
