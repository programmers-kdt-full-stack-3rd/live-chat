import jwt, {
	JsonWebTokenError,
	JwtPayload,
	TokenExpiredError,
} from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import { ITokenDTO } from "../types";
import { UnauthorizedError } from "../errors";

dotenv.config();

/**
 * 토큰 생성
 */
const createToken = (tokenDTO: ITokenDTO): ITokenDTO => {
	const token = {
		...tokenDTO,
		payload: { ...tokenDTO.payload },
	} as ITokenDTO;

	// 토큰 값 설정
	token.secretKey = process.env.JWT_SECRET_KEY;
	token.payload!.jti = uuidv4();
	token.payload!.iss = process.env.JWT_ISSUER;

	token.token = jwt.sign(token.payload!, token.secretKey!);

	return token;
};

/**
 * auth 토큰 검증
 */
const verifyAuthToken = (tokenDTO: ITokenDTO): ITokenDTO => {
	const token = {
		...tokenDTO,
		payload: { ...tokenDTO.payload },
	} as ITokenDTO;

	try {
		token.secretKey = process.env.JWT_SECRET_KEY;
		token.payload = jwt.verify(
			token.token!,
			token.secretKey!
		) as JwtPayload;

		return token;
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			throw new UnauthorizedError("유효한 토큰이 아닙니다.");
		}

		if (error instanceof TokenExpiredError) {
			throw new UnauthorizedError(
				"인증이 만료되었습니다. 다시 시도해주세요."
			);
		}

		throw new Error("auth 토큰 검증 중 에러");
	}
};

/**
 * 로그인 관련 토큰 검증
 */
const verifyLoginToken = (tokenDTO: ITokenDTO): ITokenDTO => {
	const token = { ...tokenDTO };

	if (!token.token) {
		throw new UnauthorizedError("토큰이 제공되지 않았습니다.");
	}

	token.secretKey = process.env.JWT_SECRET_KEY;

	try {
		token.payload = jwt.verify(
			token.token!,
			token.secretKey!
		) as JwtPayload;

		return token;
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			if (error.message === "invalid signature") {
				throw new UnauthorizedError("유효한 토큰이 아닙니다.");
			}
			if (error.message === "jwt malformed") {
				throw new UnauthorizedError("잘못된 토큰입니다.");
			}
		}

		if (error instanceof TokenExpiredError) {
			token.payload = jwt.decode(token.token!) as JwtPayload;

			return token;
		}

		throw new Error("인증 에러");
	}
};

/**
 * 토큰 만료 시간 검사
 */
const checkTokenExpiration = (token: ITokenDTO): boolean => {
	const now = Date.now();
	return token.payload!.exp! * 1000 < now;
};

export { createToken, verifyAuthToken, verifyLoginToken, checkTokenExpiration };
