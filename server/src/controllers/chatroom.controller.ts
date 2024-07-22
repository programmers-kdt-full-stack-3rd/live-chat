import { Request, Response } from "express";
import * as ChatroomService from "../db/context/chatrooms";

// 호준님 작업 후, req.user.id 처리 필요.

const handleError = (res: Response, error: unknown) => {
	console.log(error);

	if (error instanceof Error) {
		return res.status(500).json({ message: error.message });
	} else {
		return res.status(500).json({ message: "An unknown error occurred" });
	}
};

export const createChatRoom = async (req: Request, res: Response) => {
	const { name } = req.body;
	// const userId = req.user.id;
	const userId = 1;

	try {
		const chatroomId = await ChatroomService.createChatroom(name, userId);
		return res.status(201).json({ chatroomId });
	} catch (error) {
		return handleError(res, error);
	}
};

export const getChatrooms = async (req: Request, res: Response) => {
	// const userId = req.user.id;
	const userId = 1;

	try {
		const chatrooms = await ChatroomService.getChatrooms(userId);
		return res.status(200).json({ chatrooms });
	} catch (error) {
		return handleError(res, error);
	}
};

export const updateChatroom = async (req: Request, res: Response) => {
	const { chatroomId } = req.params;
	const numericChatroomId = parseInt(chatroomId, 10);
	const { name } = req.body;

	try {
		await ChatroomService.updateChatroom(numericChatroomId, name);
		res.status(200).json({ message: "채팅방이 수정되었습니다." });
	} catch (error) {
		return handleError(res, error);
	}
};

export const deleteChatroom = async (req: Request, res: Response) => {
	const { chatroomId } = req.params;
	const numericChatroomId = parseInt(chatroomId, 10);
	try {
		await ChatroomService.deleteChatroom(numericChatroomId);
		res.status(200).json({ message: "채팅방이 삭제되었습니다." });
	} catch (error) {
		return handleError(res, error);
	}
};

export const inviteFriendToChatroom = async (req: Request, res: Response) => {
	const { chatroomId } = req.params;
	const numericChatroomId = parseInt(chatroomId, 10);
	const { userId } = req.body; // 친구 userid

	try {
		await ChatroomService.inviteFriendToChatroom(numericChatroomId, userId);
		res.status(200).json({ message: "친구가 채팅방에 초대되었습니다." });
	} catch (error) {
		return handleError(res, error);
	}
};

export const leaveChatroom = async (req: Request, res: Response) => {
	const { chatroomId } = req.params;
	const numericChatroomId = parseInt(chatroomId, 10);
	// const userId = req.user.id;
	const userId = 1;

	try {
		await ChatroomService.leaveChatroom(numericChatroomId, userId);
		res.status(200).json({ message: "채팅방에서 나갔습니다." });
	} catch (error) {
		return handleError(res, error);
	}
};
