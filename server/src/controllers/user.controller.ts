import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { generateRandomNumber } from "../utils/random";

export const register = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 회원가입
};

export const login = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 로그인
};

export const emailAuth = async (req: Request, res: Response) => {
	const { email, create_at } = req.body;

	try {
		// 랜덤 번호 생성
		const ranNum = generateRandomNumber(4);
		console.log(ranNum);

		// jwt 토큰 생성

		// 매일 발송

		// 응답
		res.status(StatusCodes.OK).json({ message: "성공적인 응답" });
	} catch (error) {
		console.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "서버 에러",
		});
	}
};

export const emailAuthCheck = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// TODO: 이메일 인증 번호 확인
};
