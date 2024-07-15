import { ResultSetHeader } from "mysql2";
import { connectDB } from "../connection";
import * as queries from "../sql/chatroom.query";

// 1.채팅방 생성
export const createChatroom = async (name: string, userId: number) => {
	const connection = await connectDB();
	const [result] = await connection.query<ResultSetHeader>(
		queries.CREATE_CHATROOM,
		[name]
	);
	const chatroomId = result.insertId;
	await connection.query(queries.ADD_CHATROOM_MEMBER, [chatroomId, userId]);
	return chatroomId;
};

// 2. 채팅방 조회
export const getChatrooms = async (userId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(queries.GET_CHATROOMS, [userId]);
	return rows;
};

// 3. 채팅방 수정
export const updateChatroom = async (chatroomId: number, name: string) => {
	const connection = await connectDB();
	await connection.query(queries.UPDATE_CHATROOM, [chatroomId, name]);
};

// 4. 채팅방 삭제
export const deleteChatroom = async (chatroomId: number) => {
	const connection = await connectDB();
	await connection.query(queries.DELETE_CHATROOM, [chatroomId]);
	await connection.query(queries.DELETE_CHATROOM_MEMBERS, [chatroomId]);
};

// 5. 채팅방 초대
export const inviteFriendToChatroom = async (
	chatroomId: number,
	userId: number //친구 userId
) => {
	const connection = await connectDB();
	await connection.query(queries.INVITED_FRIEND_TO_CHATROOM, [
		chatroomId,
		userId,
	]);
};

// 6. 채팅방 떠나기
export const leaveChatroom = async (chatroomId: number, userId: number) => {
	const connection = await connectDB();
	await connection.query(queries.LEAVE_CHATROOM, [chatroomId, userId]);
};
