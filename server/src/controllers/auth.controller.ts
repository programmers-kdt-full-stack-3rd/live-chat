import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";

import { IRequest } from "../types/index";

import { createToken } from "../services/token";
import {
	generateVerification,
	findVerification,
	removeVerification,
	changeCode,
	verifyCode,
	checkVerifyEmail,
} from "../services/auth";
import { sendAuthMail } from "../services/mail";
import { generateExp } from "../utils/time";

dotenv.config();

/**
 * POST /auth/email/verification
 */
const createVerification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;

	try {
		// 인증 번호 생성, DB에 리소스 저장, 토큰 발급
		const verification = await generateVerification({
			authToken: {
				payload: {
					verified: false,
					sub: email,
					exp: generateExp(5 * 60), // 5분
				},
			},
		} as const);

		// 쿠키 설정
		res.cookie("authToken", verification.authToken!.token, {
			maxAge: 5 * 60 * 1000, // 5분
			httpOnly: true,
			signed: true,
		});

		// 응답
		res.status(StatusCodes.CREATED).json({
			message: "POST /auth/email/verification",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * PATCH /auth/email/verification
 */
const updateVerification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authToken = (req as IRequest).authToken!;

		// 인증된 이메일인지 확인
		checkVerifyEmail(authToken, false);

		// 인증 번호 생성 및 인증번호 변경
		await changeCode({
			authToken,
		});

		// 응답
		res.status(StatusCodes.OK).json({
			message: "PATCH /auth/email/verification",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * DELETE /auth/email/verification
 */
const deleteVerification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authToken = (req as IRequest).authToken!;

		// 인증된 이메일인지 확인
		checkVerifyEmail(authToken, true);

		// DB 리소스 삭제
		await removeVerification({
			authToken,
		});

		res.status(StatusCodes.OK).json({
			message: "DELETE /auth/email/verification",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * POST /auth/email/send-verification
 */
const sendVerification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authToken = (req as IRequest).authToken!;

		// 인증된 이메일인지 확인
		checkVerifyEmail(authToken, true);

		// 인증 번호 조회
		const verification = await findVerification({
			authToken,
		});

		// 메일 발송
		await sendAuthMail(
			verification.authToken!.payload!.sub!,
			verification.code!
		);

		// 응답
		res.status(StatusCodes.OK).json({
			message: "POST /auth/email/send-verification",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * POST /auth/email/verify
 */
const verify = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { code } = req.body;
		const authToken = (req as IRequest).authToken!;

		// 인증된 이메일인지 확인
		checkVerifyEmail(authToken, false);

		// 인증 번호 검증
		await verifyCode({
			code,
			authToken,
		});

		// 토큰 발급
		const token = createToken({
			payload: {
				verified: true,
				sub: authToken.payload!.sub!,
				exp: generateExp(60 * 60), // 1시간
			},
		});

		// 쿠키 설정
		res.cookie("authToken", token.token, {
			maxAge: 60 * 60 * 1000, // 1시간
			httpOnly: true,
			signed: true,
		});

		// 응답
		res.status(StatusCodes.OK).json({
			message: "POST /auth/email/verify",
		});
	} catch (error) {
		next(error);
	}
};

export {
	createVerification,
	updateVerification,
	deleteVerification,
	sendVerification,
	verify,
};
