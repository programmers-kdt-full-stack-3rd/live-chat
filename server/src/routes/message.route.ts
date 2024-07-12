import express from "express";

import {
	getMessages,
	addMessage,
	deleteMessage,
} from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();
router.use(express.json());

router.get("/chatrooms/:chatroomId/messages", authMiddleware, getMessages);
router.post("/chatrooms/:chatroomId/messages", authMiddleware, addMessage);
router.delete(
	"/chatrooms/:chatroomId/messages/:messagedId",
	authMiddleware,
	deleteMessage
);

export default router;
