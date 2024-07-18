import { NextFunction, Request, Response } from "express";

import { IRequest, ITokenDTO } from "../types";
import {
	checkTokenExpiration,
	createToken,
	verifyAuthToken,
	verifyLoginToken,
} from "../services/token";
import { UnauthorizedError } from "../errors";
import { findUserSession, revokeUserSession } from "../services/user";
import { generateExp } from "../utils/time";

/**
 * register 토큰 검증
 */
const authRegister = (req: Request, _: Response, next: NextFunction) => {
	try {
		// 이메일 인증 토큰
		const authToken = req.cookies.authToken;

		// 토큰 유효성 검사
		(req as IRequest).authToken = verifyAuthToken({
			token: authToken,
		} as const);

		next();
	} catch (error) {
		next(error);
	}
};

/**
 * auth(refresh, access) 검증
 */
const authLiveChat = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// access, refresh 토큰
		const accessToken = req.cookies.accessToken;
		const refreshToken = req.cookies.refreshToken;

		// 토큰 유무
		const isAccessToken = !!accessToken;
		const isRefreshToken = !!refreshToken;

		// 토큰이 둘 다 없을 경우
		if (!isAccessToken && !isRefreshToken) {
			throw new UnauthorizedError("토큰이 제공되지 않았습니다.");
		}

		// 토큰 유효성 검사
		const accessTokenDTO: ITokenDTO = ((req as IRequest).accessToken =
			isAccessToken
				? verifyLoginToken({
						token: accessToken,
				  })
				: {});
		const refreshTokenDTO: ITokenDTO = ((req as IRequest).refreshToken =
			isRefreshToken ? verifyLoginToken({ token: refreshToken }) : {});

		// 토큰 만료시간 검사
		const isAccessTokenExpired = isAccessToken
			? checkTokenExpiration(accessTokenDTO)
			: true;
		const isRefreshTokenExpired = isRefreshToken
			? checkTokenExpiration(refreshTokenDTO)
			: true;

		// 세션 조회
		const userSession = await findUserSession({
			userId: isAccessToken
				? parseInt(accessTokenDTO.payload!.sub!)
				: undefined,
			clientId: isRefreshToken
				? refreshTokenDTO.payload!.clientId
				: undefined,
			userAgent: req.headers["user-agent"],
			ipAddress: req.ip,
		});

		// 세션이 없을 때
		if (!userSession) {
			res.clearCookie("refreshToken");
			res.clearCookie("accessToken");
			throw new UnauthorizedError("세션이 없습니다.");
		}

		if (isAccessTokenExpired && isRefreshTokenExpired) {
			// case1: 둘다 만료

			await revokeUserSession(userSession);

			res.clearCookie("refreshToken");
			res.clearCookie("accessToken");

			throw new UnauthorizedError("세션 만료");
		} else if (isAccessTokenExpired) {
			// case2: access 만료

			// access 토큰 발급
			const nextAccessTokenDTO = createToken({
				payload: {
					// exp: generateExp(10 * 60), // 10분
					exp: generateExp(10), // 10초
					sub: `${userSession.userId}`,
				},
			});

			// access 토큰 쿠키 설정
			res.cookie("accessToken", nextAccessTokenDTO.token, {
				// maxAge: 10 * 60 * 1000, // 10분
				maxAge: 1 * 60 * 60 * 1000, // 1시간
				httpOnly: true,
				signed: true,
			});

			(req as IRequest).accessToken = nextAccessTokenDTO;
		} else if (isRefreshTokenExpired) {
			// case3: refresh 만료

			// refresh 토큰 발급
			const nextRefreshTokenDTO = createToken({
				payload: {
					clientId: userSession.clientId,
					// exp: generateExp(7 * 24 * 60 * 60), // 1주
					exp: generateExp(20), // 20초
					aud: userSession.userAgent, // 클라이언트 정보
				},
			});

			// refresh 토큰 쿠키 설정
			res.cookie("refreshToken", nextRefreshTokenDTO.token, {
				// maxAge: 7 * 24 * 60 * 60 * 1000, // 1주
				maxAge: 1 * 60 * 60 * 1000, // 1시간
				httpOnly: true,
				signed: true,
			});

			(req as IRequest).refreshToken = nextRefreshTokenDTO;
		}

		next();
	} catch (error) {
		next(error);
	}
};

export { authRegister, authLiveChat };
