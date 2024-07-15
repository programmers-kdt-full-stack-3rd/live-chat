import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";

import { IRequest } from "../types";
import { UnauthorizedError } from "../errors";
import { verifyToken } from "../services/token";

/**
 * 다수의 토큰 검증
 */
const verifyTokens = (...tokenNames: string[]) => {
	return (req: Request, _: Response, next: NextFunction) => {
		try {
			for (const tokenName of tokenNames) {
				// 토큰 조회
				const token = req.cookies[tokenName];

				// 토큰 검증
				const decoded = verifyToken(token);

				// 다음 미들웨어로 전달
				(req as IRequest).tokenDecodedInfo = decoded;
			}

			next();
		} catch (error) {
			// 토큰 만료
			if (error instanceof TokenExpiredError) {
				error = new UnauthorizedError();
			}

			next(error);
		}
	};
};

export { verifyTokens };
