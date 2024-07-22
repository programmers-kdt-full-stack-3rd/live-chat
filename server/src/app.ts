import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import chatroomsRouter from "./routes/chatrooms";
import { initializeSocket } from "./socket";
import globalErrorHandler from "./middlewares/error";

dotenv.config();

const app = express();
const server = http.createServer(app);

initializeSocket(server);

/**
 * CORS 설정
 */
app.use(cors());

/**
 * 쿠키 및 바디 설정
 *
 */
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
// app.use(bodyParser.json());

/**
 * API 라우팅
 */
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/chatrooms", chatroomsRouter);

/**
 * 전역 에러 핸들링 미들함수 설정
 */
app.use(globalErrorHandler);

export default app;
