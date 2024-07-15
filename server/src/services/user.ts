import dotenv from "dotenv";
import { randomBytes, pbkdf2Sync } from "crypto";

import { insertUser } from "../db/context/users";

dotenv.config();

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

export { createNewUser };
