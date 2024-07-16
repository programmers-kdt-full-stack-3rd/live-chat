import dotenv from "dotenv";
import { randomBytes, pbkdf2Sync } from "crypto";

import { getUserByEmail, insertUser } from "../db/context/users";
import { BadRequestError } from "../errors";

dotenv.config();

/**
 * 타입 정의
 */
type TUserInfo = {
	id: number;
	name: string;
	passwordHash: string;
	salt: string;
};

/**
 * 유저 생성
 */
const createNewUser = async (
	email: string,
	name: string,
	password: string
): Promise<object> => {
	const salt = randomBytes(10).toString("base64");
	const passwordHash = pbkdf2Sync(
		password,
		salt,
		10000,
		10,
		"sha512"
	).toString("base64");

	const [result] = await insertUser(email, name, passwordHash, salt);

	return result;
};

const findUserByEmail = async (email: string): Promise<TUserInfo> => {
	const result = await getUserByEmail(email);

	console.log(result);

	if (result.length > 1) throw new Error("검색된 유저의 수가 너무 많습니다.");
	if (result.length < 1) throw new BadRequestError("유저 정보가 없습니다.");

	const userInfo: TUserInfo = {
		id: result[0].id,
		name: result[0].name,
		passwordHash: result[0].password_hash,
		salt: result[0].salt,
	};

	return userInfo;
};

const verifyPassword = (
	password: string,
	passwordHash: string,
	salt: string
): void => {
	const reqPasswordHash = pbkdf2Sync(
		password,
		salt,
		10000,
		10,
		"sha512"
	).toString("base64");

	const isVerify = reqPasswordHash === passwordHash;

	if (!isVerify) throw new BadRequestError("비밀번호가 틀립니다.");
};

export { createNewUser, findUserByEmail, verifyPassword };
