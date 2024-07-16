import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { IAccessInfo, IAuthInfo, IRefreshInfo } from "../types";

dotenv.config();

type TPayload = IAuthInfo | IAccessInfo | IRefreshInfo;
type TExpiresIn = string | number | undefined;

/**
 * 토큰 발급
 */
const createToken = (payload: TPayload, expiresIn: TExpiresIn): string => {
	const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
		issuer: process.env.JWT_ISSUER,
		expiresIn,
	});

	return token;
};

/**
 * 토큰 검증
 */
const verifyToken = (token: string): TPayload => {
	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as TPayload;

	return decoded;
};

export { createToken, verifyToken };
