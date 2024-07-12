import { ResultSetHeader } from "mysql2";
import { connectDB } from "../connection";
import * as queries from "../sql/message.query";

export const getMessages = async (chatroomId: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(queries.GET_MESSAGES, [chatroomId]);
	return rows;
};

export const addMessages = async (
	chatroomId: number,
	userId: number,
	content: string
) => {
	const connection = await connectDB();
	const [result] = await connection.query<ResultSetHeader>(
		queries.ADD_MESSAGE,
		[chatroomId, userId, content]
	);
	return {
		message_id: result.insertId,
		chatroom_id: chatroomId,
		user_id: userId,
		content,
		created_date: new Date(),
	};
};

export const deleteMessage = async (messageId: number) => {
	const connection = await connectDB();
	await connection.query(queries.DELETE_MESSAGE, [messageId]);
};
