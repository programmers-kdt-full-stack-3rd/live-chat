import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import {
	registerUser,
	createUserSession,
	findUser,
	verifyPassword,
	findUserSession,
	activateSession,
} from "../services/user";
import { IRequest } from "../types";
import { createToken } from "../services/token";
import { checkVerifyEmail } from "../services/auth";
import { generateExp } from "../utils/time";

/**
 * POST /api/users/register
 */
const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// auth 토큰 정보
		const authToken = (req as IRequest).authToken!;

		// 인증 확인
		checkVerifyEmail(authToken, true);

		// 유저 정보 생성
		await registerUser({
			email: authToken.payload!.sub!,
			name: req.body.email,
			password: req.body.password,
		});

		// 쿠키 삭제
		res.clearCookie("authToken");

		// 응답
		res.status(StatusCodes.SEE_OTHER).json({
			message: "리다이렉트 로그인 페이지 url",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * POST /api/users/login
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userAgent = req.headers["user-agent"];
		const ipAddress = req.ip;
		const { email, password } = req.body;

		const accessToken = req.cookies.accessToken;
		const refreshToken = req.cookies.refreshToken;

		// 토큰 확인
		if (!!accessToken || !!refreshToken) {
			// 메인 페이지로 리다이렉트 응답
			return res.status(StatusCodes.SEE_OTHER).json({
				message: "리다이렉트 실시간 채팅 메인 url",
			});
		}

		// 유저 데이터 조회
		const user = await findUser({ email, password } as const);

		// 로그인 검증
		verifyPassword(user);

		// 세션 조회
		const session = await findUserSession({
			userId: user.id,
			userAgent,
			ipAddress,
		} as const);

		// refreshToken 발급
		const refreshTokenDTO = createToken({
			payload: {
				clientId: !session ? uuidv4() : session.clientId,
				// exp: generateExp(7 * 24 * 60 * 60), // 1주
				exp: generateExp(20), // 20초
				aud: !session ? userAgent : session.userAgent,
			},
		} as const);

		if (!session) {
			// 세션 생성
			await createUserSession({
				clientId: refreshTokenDTO.payload!.clientId!,
				userId: user.id,
				userName: user.name,
				userAgent,
				ipAddress,
				refreshToken: refreshTokenDTO.token,
				expiredAt: new Date(refreshTokenDTO.payload!.exp!),
			} as const);
		} else {
			// 세션 활성화
			await activateSession({
				...session,
				refreshToken: refreshTokenDTO.token,
				expiredAt: new Date(refreshTokenDTO.payload!.exp!),
			} as const);
		}

		// access 토큰 발급
		const accessTokenDTO = createToken({
			payload: {
				// exp: generateExp(10 * 60), // 10분
				exp: generateExp(10), // 10초
				sub: `${user.id}`,
			},
		});

		// refresh 토큰 쿠키 설정
		res.cookie("refreshToken", refreshTokenDTO.token, {
			// maxAge: 7 * 24 * 60 * 60 * 1000, // 1주
			maxAge: 1 * 60 * 60 * 1000, // 1시간
			httpOnly: true,
			signed: true,
		});

		// access 토큰 쿠키 설정
		res.cookie("accessToken", accessTokenDTO.token, {
			// maxAge: 10 * 60 * 1000, // 10분
			maxAge: 1 * 60 * 60 * 1000, // 1시간
			httpOnly: true,
			signed: true,
		});

		// 메인 페이지로 리다이렉트 응답
		res.status(StatusCodes.SEE_OTHER).json({
			message: "리다이렉트 실시간 채팅 메인 url",
		});
	} catch (error) {
		next(error);
	}
};

export { register, login };
