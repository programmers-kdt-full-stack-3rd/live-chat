import { Request, Response } from "express";
import * as FriendService from "../db/context/friends";
import * as UserService from "../db/context/users"; // 호준님 파트 연결 예정.

const handleError = (res: Response, error: unknown) => {
	console.log(error);

	if (error instanceof Error) {
		return res.status(500).json({ message: error.message });
	} else {
		return res.status(500).json({ message: "An unknown error occurred" });
	}
};

export const getFriends = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const numericUserId = parseInt(userId, 10);

	if (isNaN(numericUserId)) {
		return res.status(400).json({ error: "Invalid user ID" }); // 400: 'Bad Request'
	}

	try {
		const friends = await FriendService.getFriends(numericUserId);
		return res.status(200).json({ friends });
	} catch (error) {
		return handleError(res, error);
	}
};

export const addFriend = async (req: Request, res: Response) => {
	const { fromUserId, toUserId, name, email } = req.body;

	try {
		const userExists = await UserService.getUserById(toUserId);
		if (!userExists) {
			return res
				.status(404)
				.json({ error: "사용자가 존재하지 않습니다." });
		}

		await FriendService.addFriend(fromUserId, toUserId, name, email);
		return res.status(201).json({ message: "친구 요청이 전송되었습니다." });
	} catch (error) {
		return handleError(res, error);
	}
};

export const getFriendRequests = async (req: Request, res: Response) => {
	const { userId } = req.params;

	const numericUserId = parseInt(userId, 10);

	if (isNaN(numericUserId)) {
		return res.status(400).json({ error: "Invalid user ID" }); // 400: 'Bad Request'
	}

	try {
		const sentRequest = await FriendService.getSentFriendRequests(
			numericUserId
		);
		const receivedRequests = await FriendService.getReceivedFriendRequests(
			numericUserId
		);
		return res.status(200).json({ sentRequest, receivedRequests });
	} catch (error) {
		return handleError(res, error);
	}
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
	const { friendId } = req.body;

	try {
		await FriendService.acceptFriendRequest(friendId);
		return res.status(200).json({ message: "친구 요청을 수락했습니다." });
	} catch (error) {
		return handleError(res, error);
	}
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
	const { friendId } = req.body;

	try {
		await FriendService.rejectFriendRequest(friendId);
		return res.status(200).json({ message: "친구 요청을 거절했습니다." });
	} catch (error) {
		return handleError(res, error);
	}
};
