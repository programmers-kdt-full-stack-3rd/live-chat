import { connectDB } from "../connection";

export const temp = async () => {};

// 1. 친구 목록 조회
export const getFriends = async (userId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(
		`SELECT u.user_id, u.name, u.email
        FROM friends f
        JOIN users u ON f.to_user_id = u.user_id
        WHERE f.from_user_id = ? AND f.are_we_friend = 1
        UNION
        SELECT u.user_id, u.name, u.email
        FROM friends f
        JOIN users u ON f.from_user_id = u.user_id
        WHERE f.to_user_id = ? AND f.are_we_friend = 1`,
		[userId, userId]
	);
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
	await connection.query(
		`INSERT INTO friends (from_user_id, to_user_id, name, email) VALUES (?,?,?,?)`,
		[fromUserId, toUserId, name, email]
	);
};

// 3-1. 친구 초대 목록 조회(초대 보냄)
export const getSentFriendRequests = async (userId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(
		`SELECT f.friend_id, u.user_id, u.name, u.email
        FROM friends f
        JOIN users u ON f.from_user_id = u.user_id
        WHERE f.from_user_id = ? AND f.are_we_friend = 0;`,
		[userId]
	);
	return rows;
};

// 3-2. 친구 초대 목록 조회(초대 받음)
export const getReceivedFriendRequests = async (userId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(
		`SELECT f.friend_id, u.user_id, u.name, u.email
        FROM friends f
        JOIN users u ON f.from_user_id = u.user_id
        WHERE f.to_user_id = ? AND f.are_we_friend = 0;`,
		[userId]
	);
	return rows;
};

// 4. 친구 요청 수락
export const acceptFriendRequest = async (friendId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(
		`UPDATE friends SET are_we_friend = 1, last_modified_date = CURRENT_TIMESTAMP WHERE friend_id = ?`,
		[friendId]
	);
};

// 5. 친구 요청 거절
export const rejectFriendRequest = async (friendId: number) => {
	const connection = await connectDB();
	await connection.query(`DELETE FROM friends WHERE friend_id = ?`, [
		friendId,
	]);
};
