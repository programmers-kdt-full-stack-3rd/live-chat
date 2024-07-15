import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { IAuthTokenPayload } from "../types";

dotenv.config();

/**
 * 토큰 발급
 */
const createToken = (
	payload: IAuthTokenPayload,
	expiresIn: string | number | undefined
) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
		issuer: process.env.JWT_ISSUER,
		expiresIn,
	});

	return token;
};

/**
 * 토큰 검증
 */
const verifyToken = (token: string): IAuthTokenPayload => {
	const decoded = jwt.verify(
		token,
		process.env.JWT_SECRET_KEY!
	) as IAuthTokenPayload;

	return decoded;
};

export { createToken, verifyToken };
