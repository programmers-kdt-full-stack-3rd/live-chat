export const GET_MESSAGES =
	"SELECT message_id, user_id, content, created_date FROM message WHERE chatroom_id = ? ORDER BY created_date ASC";

export const ADD_MESSAGE =
	"INSERT INTO messages (chatroom_id, user_id, content) VALUES (?,?,?)";

export const DELETE_MESSAGE = "DELETE FROM messages WHERE message_id = ?";
