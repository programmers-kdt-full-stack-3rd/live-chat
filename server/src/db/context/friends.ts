import { connectDB } from "../connection";
import * as queries from "../sql/friend.query";

// 1. 친구 목록 조회
export const getFriends = async (userId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(queries.GET_FRIENDS, [
		userId,
		userId,
	]);
	return rows;
};

// 2. 친구 추가
export const addFriend = async (
	fromUserId: number,
	toUserId: number,
	name: string,
	email: string
) => {
	const connection = await connectDB();
	await connection.query(queries.ADD_FRIEND, [
		fromUserId,
		toUserId,
		name,
		email,
	]);
};

// 3-1. 친구 초대 목록 조회(초대 보냄)
export const getSentFriendRequests = async (userId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(queries.GET_SENT_FRIEND_REQUESTS, [
		userId,
	]);
	return rows;
};

// 3-2. 친구 초대 목록 조회(초대 받음)
export const getReceivedFriendRequests = async (userId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(
		queries.GET_RECEIVED_FRIEND_REQUESTS,
		[userId]
	);
	return rows;
};

// 4. 친구 요청 수락
export const acceptFriendRequest = async (friendId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(queries.ACCEPT_FRIEND_REQUEST, [
		friendId,
	]);
};

// 5. 친구 요청 거절
export const rejectFriendRequest = async (friendId: number) => {
	const connection = await connectDB();
	await connection.query(queries.REJECT_FRIEND_REQUEST, [friendId]);
};
