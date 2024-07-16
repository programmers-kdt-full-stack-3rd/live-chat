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
const login = (req: Request, res: Response) => {
	// TODO: 로그인
};

export { register, login };
