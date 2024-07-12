import { Request, Response } from "express";
import * as MessageService from "../db/context/messages";

const handleError = (res: Response, error: unknown) => {
	console.log(error);

	if (error instanceof Error) {
		return res.status(500).json({ message: error.message });
	} else {
		return res.status(500).json({ message: "An unknown error occurred" });
	}
};

export const getMessages = async (req: Request, res: Response) => {
	const { chatroomId } = req.params;
	const numericChatroomId = parseInt(chatroomId, 10);
	try {
		const messages = await MessageService.getMessages(numericChatroomId);
		return res.status(200).json({ messages });
	} catch (error) {
		return handleError(res, error);
	}
};

export const addMessage = async (req: Request, res: Response) => {
	const { chatroomId } = req.params;
	const numericChatroomId = parseInt(chatroomId, 10);
	const userId = req.user.id;
	const { content } = req.body;

	try {
		const message = await MessageService.addMessages(
			numericChatroomId,
			userId,
			content
		);
		return res.status(201).json({ message });
	} catch (error) {
		return handleError(res, error);
	}
};

export const deleteMessage = async (req: Request, res: Response) => {
	const { messageId } = req.params;
	const numericMessageId = parseInt(messageId, 10);

	try {
		await MessageService.deleteMessage(numericMessageId);
		res.status(200).json({ message: "메세지가 삭제되었습니다." });
	} catch (error) {
		return handleError(res, error);
	}
};
