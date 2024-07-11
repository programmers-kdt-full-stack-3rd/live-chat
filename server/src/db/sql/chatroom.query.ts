export const CREATE_CHATROOM = "INSERT INTO chatrooms (name) VALUES (?)";
export const ADD_CHATROOM_MEMBER =
	"INSERT INTO chatroom_members (chatroom_id, user_id) VALUES (?,?)";
export const GET_CHATROOMS = `
    SELECT c.chatroom_id, c.name
    FROM chatroom_members cm
    JOIN chatrooms c ON cm.chatroom_id = c.chatroom_id
    WHERE cm.user_id = ?`;
export const UPDATE_CHATROOM =
	"UPDATE chatrooms SET name = ?, last_modified_date = CURRENT_TIMESTAMP WHERE chatroom_id = ?";
export const DELETE_CHATROOM = "DELETE FROM chatrooms WHERE chatroom_id = ?";
export const DELETE_CHATROOM_MEMBERS =
	"DELETE FROM chatroom_members WHERE chatroom_id = ?";

export const INVITED_FRIEND_TO_CHATROOM =
	"INSERT INTO chatroom_members (chatroom_id, user_id) VALUES (?,?)";
export const LEAVE_CHATROOM =
	"DELETE FROM chatroom_members WHERE chatroom_id = ? AND user_id = ?";
