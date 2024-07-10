import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { sendAuthMail } from "../services/mail";
import { generateRandomNumber } from "../utils/random";
import { generateToken } from "../services/auth";

export const register = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 회원가입
};

export const login = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 로그인
};

export const emailAuth = async (req: Request, res: Response) => {
	const email = req.body.email;

	try {
		// 랜덤 번호 생성
		const ranNum = generateRandomNumber(4);

		// jwt 토큰 생성
		const token = generateToken(
			{
				email,
			},
			ranNum,
			"5m"
		);

		// 매일 발송
		await sendAuthMail(email, ranNum);

		// 응답
		res.status(StatusCodes.OK).json({ token });
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
