import express from "express";
import { authLiveChat } from "../middlewares/auth";

import {
	createChatRoom,
	getChatrooms,
	updateChatroom,
	deleteChatroom,
	inviteFriendToChatroom,
	leaveChatroom,
} from "../controllers/chatroom.controller";
import { mergeSignedCookiesIntoCookies } from "../middlewares/validate";

const router = express.Router();
router.use(express.json());

router.post(
	"/chatrooms",
	mergeSignedCookiesIntoCookies,

	authLiveChat,
	createChatRoom
);
router.get("/chatrooms", authLiveChat, getChatrooms);
router.put("/chatrooms/:chatroomId", authLiveChat, updateChatroom);
router.delete(
	"/chatrooms/:chatroomId",

	authLiveChat,
	deleteChatroom
);
router.post(
	"/chatrooms/:chatroomId/invite",

	authLiveChat,
	inviteFriendToChatroom
);
router.delete(
	"/chatrooms/:chatroomId/invite",

	authLiveChat,
	leaveChatroom
);

export default router;
