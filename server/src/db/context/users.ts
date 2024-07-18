import { ResultSetHeader, RowDataPacket } from "mysql2";

import { connectDB } from "../connection";
import { IUserDTO, IUserSessionDTO } from "../../types";

/**
 * 새로운 유저 저장
 */
const insertUser = async (userDTO: IUserDTO): Promise<IUserDTO> => {
	const user = { ...userDTO };

	const connection = await connectDB();
	const [result] = await connection.query<ResultSetHeader>(
		`INSERT INTO users
        (email, name, password_hash, salt) VALUES (?, ?, ?, ?)`,
		[user.email, user.name, user.passwordHash, user.salt]
	);

	user.id = result.insertId;

	return user;
};

/**
 * 유저 세션에 저장
 */
const insertUserSession = async (
	userSessionDTO: IUserSessionDTO
): Promise<ResultSetHeader> => {
	const connection = await connectDB();
	const [result] = await connection.query<ResultSetHeader>(
		`INSERT INTO user_sessions
        (client_id, user_id, user_agent, ip_address, refresh_token, expired_at) VALUES (?, ?, ?, ?, ?, ?)`,
		[
			userSessionDTO.clientId,
			userSessionDTO.userId,
			userSessionDTO.userAgent,
			userSessionDTO.ipAddress,
			userSessionDTO.refreshToken,
			userSessionDTO.expiredAt,
		]
	);

	return result;
};

/**
 * 유저 조회 by id
 */
const getUserById = async (userDTO: IUserDTO): Promise<IUserDTO[]> => {
	const connection = await connectDB();
	const [rows] = await connection.query<RowDataPacket[]>(
		`SELECT * FROM users
        WHERE id=?`,
		[userDTO.id]
	);

	return rows.map(
		(row: RowDataPacket) =>
			({
				email: row.email,
				password: userDTO.password,
				id: row.id,
				name: row.name,
				passwordHash: row.password_hash,
				salt: row.salt,
				createdAt: row.created_at,
				updatedAt: row.updated_at,
			} as IUserDTO)
	);
};

/**
 * 유저 조회 by email
 */
const getUserByEmail = async (userDTO: IUserDTO): Promise<IUserDTO[]> => {
	const connection = await connectDB();
	const [rows] = await connection.query<RowDataPacket[]>(
		`SELECT * FROM users
        WHERE email=?`,
		[userDTO.email]
	);

	return rows.map(
		(row: RowDataPacket) =>
			({
				email: row.email,
				password: userDTO.password,
				id: row.id,
				name: row.name,
				passwordHash: row.password_hash,
				salt: row.salt,
				createdAt: row.created_at,
				updatedAt: row.updated_at,
			} as IUserDTO)
	);
};

/**
 * 유저 세션 조회
 */
const getUserSessionAndUserName = async (
	userSessionDTO: IUserSessionDTO
): Promise<IUserSessionDTO[]> => {
	const connection = await connectDB();
	const [rows] = await connection.query<RowDataPacket[]>(
		`
		SELECT us.*, u.name AS user_name
		FROM user_sessions us
		JOIN users u ON us.user_id = u.id
		WHERE us.client_id = ?
		OR (us.user_id = ? AND us.user_agent = ? AND us.ip_address = ?);
		`,
		[
			userSessionDTO.clientId,
			userSessionDTO.userId,
			userSessionDTO.userAgent,
			userSessionDTO.ipAddress,
		]
	);

	return rows.map(
		(row: RowDataPacket) =>
			({
				id: row.id,
				clientId: row.client_id,
				userId: row.user_id,
				userName: row.user_name,
				userAgent: row.user_agent,
				ipAddress: row.ip_address,
				refreshToken: row.refresh_token,
				revoked: row.revoked,
				expiredAt: row.expired_at,
				cretedAt: row.created_at,
				updatedAt: row.updated_at,
				lastAccessedAt: row.last_accessed_at,
			} as IUserSessionDTO)
	);
};

/**
 * 유저 세션 정보 업데이트
 */
const updateUserSession = async (
	userSessionDTO: IUserSessionDTO
): Promise<ResultSetHeader> => {
	const connection = await connectDB();
	const [result] = await connection.query<ResultSetHeader>(
		`
		UPDATE user_sessions
		SET refresh_token=?, revoked=?, expired_at=?, updated_at=?, last_accessed_at=?
		WHERE client_id = ?
		OR (user_id = ? AND user_agent = ? AND ip_address = ?);
		`,
		[
			userSessionDTO.refreshToken,
			userSessionDTO.revoked,
			userSessionDTO.expiredAt,
			userSessionDTO.updatedAt,
			userSessionDTO.lastAccessedAt,
			userSessionDTO.clientId,
			userSessionDTO.userId,
			userSessionDTO.userAgent,
			userSessionDTO.ipAddress,
		]
	);

	return result;
};

/**
 * 유저 revoked 업데이트
 */
const updateUserSessionRevoked = async (
	userSessionDTO: IUserSessionDTO
): Promise<ResultSetHeader> => {
	const connection = await connectDB();
	const [result] = await connection.query<ResultSetHeader>(
		`
		UPDATE user_sessions
		SET revoked = ?, updated_at = ?, last_accessed_at = ?
		WHERE client_id = ? OR (user_id = ? AND user_agent = ? AND ip_address = ?);
		`,
		[
			userSessionDTO.revoked,
			userSessionDTO.updatedAt,
			userSessionDTO.lastAccessedAt,
			userSessionDTO.clientId,
			userSessionDTO.userId,
			userSessionDTO.userAgent,
			userSessionDTO.ipAddress,
		]
	);

	return result;
};

export {
	insertUser,
	insertUserSession,
	getUserById,
	getUserByEmail,
	getUserSessionAndUserName,
	updateUserSession,
	updateUserSessionRevoked,
};
