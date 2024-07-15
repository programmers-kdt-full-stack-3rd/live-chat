import express from "express";
import { authMiddleware } from "../middlewares/auth";

import {
	createChatRoom,
	getChatrooms,
	updateChatroom,
	deleteChatroom,
	inviteFriendToChatroom,
	leaveChatroom,
} from "../controllers/chatroom.controller";

const router = express.Router();
router.use(express.json());

router.post("/chatrooms", authMiddleware, createChatRoom);
router.get("/chatrooms", authMiddleware, getChatrooms);
router.put("/chatrooms/:chatroomId", authMiddleware, updateChatroom);
router.delete("/chatrooms/:chatroomId", authMiddleware, deleteChatroom);
router.post(
	"/chatrooms/:chatroomId/invite",
	authMiddleware,
	inviteFriendToChatroom
);
router.delete("/chatrooms/:chatroomId/invite", authMiddleware, leaveChatroom);

export default router;
