export const GET_FRIENDS = `
    SELECT u.user_id, u.name, u.email
    FROM friends f
    JOIN users u ON f.to_user_id = u.user_id
    WHERE f.from_user_id = ? AND f.are_we_friend = 1
    UNION
    SELECT u.user_id, u.name, u.email
    FROM friends f
    JOIN users u ON f.from_user_id = u.user_id
    WHERE f.to_user_id = ? AND f.are_we_friend = 1`;

export const ADD_FRIEND =
	"INSERT INTO friends (from_user_id, to_user_id, name, email) VALUES (?,?,?,?)";

export const GET_SENT_FRIEND_REQUESTS = `
    SELECT f.friend_id, u.user_id, u.name, u.email
    FROM friends f
    JOIN users u ON f.from_user_id = u.user_id
    WHERE f.from_user_id = ? AND f.are_we_friend = 0`;

export const GET_RECEIVED_FRIEND_REQUESTS = `
    SELECT f.friend_id, u.user_id, u.name, u.email
    FROM friends f
    JOIN users u ON f.from_user_id = u.user_id
    WHERE f.to_user_id = ? AND f.are_we_friend = 0`;

export const ACCEPT_FRIEND_REQUEST =
	"UPDATE friends SET are_we_friend = 1, last_modified_date = CURRENT_TIMESTAMP WHERE friend_id = ?";

export const REJECT_FRIEND_REQUEST = "DELETE FROM friends WHERE friend_id = ?";
