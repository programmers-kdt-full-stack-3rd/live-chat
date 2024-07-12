import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// TODO: 인증 및 인가

dotenv.config();

/**
 * 토큰 생성
 */
const generateToken = (payload: object, expiresIn: string = "") => {
	const options: jwt.SignOptions = {
		expiresIn,
		issuer: process.env.JWT_ISSUER,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, options);

	return token;
};

/**
 * verification 생성
 */

/**
 * verification 수정
 */

/**
 * verification 삭제
 */

export { generateToken };
