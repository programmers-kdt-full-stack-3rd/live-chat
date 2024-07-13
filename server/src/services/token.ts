import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * 토큰 발급
 */
const createToken = (payload: object, expiresIn: string = "") => {
	const options: jwt.SignOptions = {
		expiresIn,
		issuer: process.env.JWT_ISSUER,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, options);

	return token;
};

export { createToken };
