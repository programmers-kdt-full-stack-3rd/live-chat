import express from "express";

import {
	createChatRoom,
	deleteChatRoom,
	readChatRoom,
	updateChatRoom,
} from "../controllers/chatroom.controller";

const router = express.Router();
router.use(express.json());

/**
 * 엔드포인트 정의
 */
router.post("/chatrooms/:id", createChatRoom);
router.get("/chatrooms/:id", readChatRoom);
router.put("/chatrooms/:id", updateChatRoom);
router.delete("/chatrooms/:id", deleteChatRoom);

export default router;
