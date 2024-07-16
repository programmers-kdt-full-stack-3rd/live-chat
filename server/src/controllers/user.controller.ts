import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import {
	createNewUser,
	findUserByEmail,
	verifyPassword,
} from "../services/user";
import { IRequest } from "../types";
import { BadRequestError } from "../errors";
import { createToken } from "../services/token";

/**
 * POST /api/users/register
 */
const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, verified } = (req as IRequest).tokenDecodedInfos!
			.authInfo!;
		const { password, name } = req.body;

		// 인증 확인
		if (!verified) {
			throw new BadRequestError("이메일 인증이 이뤄지지 않았습니다.");
		}

		// 유저 정보 생성
		await createNewUser(email, name, password);

		// 쿠키 삭제
		res.clearCookie("auth_token");

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
		let refreshToken = req.cookies["refresh_token"];

		const { email, password } = req.body;

		let userId = 0;
		let userName = "";

		// refresh 토큰 확인
		if (!refreshToken) {
			// refresh 토큰 없을 경우

			// 유저 데이터 조회
			const { id, name, passwordHash, salt } = await findUserByEmail(
				email
			);

			userId = id;
			userName = name;

			// 로그인 검증
			verifyPassword(password, passwordHash, salt);

			// refresh 토큰 발급
			refreshToken = createToken(
				{ jti: uuidv4(), userId, userAgent },
				"1w"
			);

			// TODO: 세션 생성
		} else {
			// refresh 토큰 있을 경우
			// TODO: 세션 확인
			// TODO: (세션 없을 경우) 로그인 검증 => 세션 생성
			// TODO: (세션 있을 경우) 세션 업데이트
			// TODO: return 리다이렉트 응답
		}

		// access 토큰 발급
		const accessToken = createToken(
			{
				jti: uuidv4(),
				userId,
			},
			"10m"
		);

		// 쿠키 설정
		res.cookie("refresh_token", refreshToken, {
			maxAge: 604800000, // 1주
			httpOnly: true,
			signed: true,
		});

		// 메인 페이지로 리다이렉트 응답
		res.status(StatusCodes.SEE_OTHER).json({
			message: "리다이렉트 실시간 채팅 메인 url",
			access_token: accessToken,
			user_name: userName,
		});
	} catch (error) {
		next(error);
	}
};

export { register, login };
