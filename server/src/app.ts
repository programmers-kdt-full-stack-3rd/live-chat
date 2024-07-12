import express from "express";
import http from "http";
import dotenv from "dotenv";
import usersRouter from "./routes/users";
import chatroomsRouter from "./routes/chatrooms";
import { initializeSocket } from "./socket";

dotenv.config();

const app = express();
const server = http.createServer(app);

initializeSocket(server);

/**
 * API 라우팅
 */
app.use("/users", usersRouter);
app.use("/chatrooms", chatroomsRouter);

export default app;
