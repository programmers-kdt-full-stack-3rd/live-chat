import dotenv from "dotenv";
import { randomBytes, pbkdf2Sync } from "crypto";

import {
	getUserByEmail,
	getUserById,
	getUserSessionAndUserName,
	insertUser,
	insertUserSession,
	updateUserSession,
	updateUserSessionRevoked,
} from "../db/context/users";
import { BadRequestError, UnauthorizedError } from "../errors";
import { IUserDTO, IUserSessionDTO } from "../types";

dotenv.config();

/**
 * 유저 생성
 */
const registerUser = async (userDTO: IUserDTO): Promise<IUserDTO> => {
	const user = { ...userDTO };

	// 비밀번호 암호화
	user.salt = randomBytes(10).toString("base64");
	user.passwordHash = pbkdf2Sync(
		user.password!,
		user.salt,
		10000,
		10,
		"sha512"
	).toString("base64");

	return await insertUser(user);
};

/**
 * 세션 생성
 */
const createUserSession = async (
	userSessionDTO: IUserSessionDTO
): Promise<IUserSessionDTO> => {
	const userSession = { ...userSessionDTO };

	const result = await insertUserSession(userSession);

	if (result.affectedRows !== 1) throw Error();

	userSession.id = result.insertId;

	return userSession;
};

/**
 * 사용자 정보 조회
 */
const findUser = async (userDTO: IUserDTO): Promise<IUserDTO> => {
	const isId = userDTO.id !== undefined;
	const isEmail = userDTO.email !== undefined;

	const rows = isId
		? await getUserById(userDTO)
		: isEmail
		? await getUserByEmail(userDTO)
		: [];

	if (rows.length > 1) throw new Error("검색된 유저의 수가 너무 많습니다.");
	if (rows.length < 1) throw new BadRequestError("유저 정보가 없습니다.");

	return rows[0];
};

/**
 * 세션 조회
 */
const findUserSession = async (
	userSessionDTO: IUserSessionDTO
): Promise<IUserSessionDTO | null> => {
	const rows = await getUserSessionAndUserName(userSessionDTO);

	if (rows.length > 1) throw new Error("세션 개수가 너무 많습니다.");

	const session = rows.length > 0 ? rows[0] : null;

	return session;
};

/**
 * 세션 활성화
 */
const activateSession = async (
	userSessionDTO: IUserSessionDTO
): Promise<void> => {
	const userSession = { ...userSessionDTO };
	const now = new Date(Date.now());

	userSession.revoked = false;
	userSession.updatedAt = now;
	userSession.lastAccessedAt = now;

	const result = await updateUserSession(userSession);

	if (result.affectedRows !== 1) throw Error();
};

/**
 * 세션 취소
 */
const revokeUserSession = async (userSessionDTO: IUserSessionDTO) => {
	const userSession = { ...userSessionDTO };
	const now = new Date(Date.now());

	userSession.revoked = true;
	userSession.updatedAt = now;
	userSession.lastAccessedAt = now;

	const result = await updateUserSessionRevoked(userSession);

	if (result.affectedRows !== 1) throw Error("");

	return userSession;
};

/**
 * 비밀번호 검증
 */
const verifyPassword = (userDTO: IUserDTO): void => {
	// 검증
	const passwordHash = pbkdf2Sync(
		userDTO.password!,
		userDTO.salt!,
		10000,
		10,
		"sha512"
	).toString("base64");

	const isVerify = passwordHash === userDTO.passwordHash;

	if (!isVerify)
		throw new UnauthorizedError("비밀번호가 틀립니다. 다시 시도해주세요.");
};

export {
	registerUser,
	createUserSession,
	findUser,
	findUserSession,
	activateSession,
	revokeUserSession,
	verifyPassword,
};
