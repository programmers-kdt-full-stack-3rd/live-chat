import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createNewUser } from "../services/user";
import { IRequest } from "../types";
import { BadRequestError } from "../errors";

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
const login = (req: Request, res: Response, next: NextFunction) => {
	try {
		const refreshToken = req.cookies["refresh_token"];

		// refresh 토큰 확인
		if (!refreshToken) {
			// TODO: refresh 토큰 및 access 토큰 발급
			// TODO: 세션 생성
		} else {
			// TODO: 세션 확인
			// TODO: 세션 업데이트
			// TODO: access 토큰 발급
		}

		// TODO: 쿠키 설정

		// 메인 페이지로 리다이렉트 응답
		res.status(StatusCodes.SEE_OTHER).json({
			message: "리다이렉트 실시간 채팅 메인 url",
		});
	} catch (error) {
		next(error);
	}
};

export { register, login };
