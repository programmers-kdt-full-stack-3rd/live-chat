import express from "express";
import dotenv from "dotenv";

import usersRouter from "./routes/users";
import chatroomsRouter from "./routes/chatrooms";

dotenv.config();

const app = express();

/**
 * API 라우팅
 */
app.use("/users", usersRouter);
app.use("/chatrooms", chatroomsRouter);

export default app;
