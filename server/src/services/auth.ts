import jwt from "jsonwebtoken";

// TODO: 인증 및 인가

/**
 * 토큰 생성
 */
const generateToken = (info: object, key: string, expiresIn: string) => {
	const payload = info;
	const options: jwt.SignOptions = {
		expiresIn,
	};

	const token = jwt.sign(payload, key, options);

	return token;
};

export { generateToken };
