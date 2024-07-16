import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";

import {
	IAccessInfo,
	IAuthInfo,
	IRefreshInfo,
	IRequest,
	TTokenDocodedInfos,
} from "../types";

import { BadRequestError, UnauthorizedError } from "../errors";

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

				// req에 쿠키에 담긴 토큰 payload를 담은 토큰 객체 생성
				const tokenDecodedInfos: TTokenDocodedInfos = {};
				(req as IRequest).tokenDecodedInfos = tokenDecodedInfos;

				// 다음 미들웨어로 전달
				switch (tokenName) {
					case "auth_token":
						tokenDecodedInfos.authInfo = decoded as IAuthInfo;
						break;
					case "access_token":
						tokenDecodedInfos.accessInfo = decoded as IAccessInfo;
						break;
					case "refresh_token":
						tokenDecodedInfos.refreshInfo = decoded as IRefreshInfo;
						break;
					default:
						throw new BadRequestError(
							"토큰 이름이 잘못되었습니다."
						);
				}
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

const authUser = (req: Request, _: Response, next: NextFunction) => {
	try {
		const accessInfo = (req as IRequest).tokenDecodedInfos!.accessInfo!;
		const refreshInfo = (req as IRequest).tokenDecodedInfos!.refreshInfo!;

		next();
	} catch (error) {
		next(error);
	}
};

export { verifyTokens, authUser };
