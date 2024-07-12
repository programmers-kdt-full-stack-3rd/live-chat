import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { generateToken } from "../services/auth";
import { generateRandomNumber } from "../utils/random";
import {
	addVerification,
	updateVerification,
	deleteVerification,
} from "../db/context/verifications";
// import { sendAuthMail } from "../services/mail";

const createVerificationRequest = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		// 인증 번호 생성
		const code = generateRandomNumber(6);

		// DB 리소스 생성
		await addVerification(email, code);

		// token 발급
		const token = generateToken({ email, status: 0 }, "60m");
		console.log(token);

		// 토큰 쿠키 전송
		res.cookie("register_token", token, {
			maxAge: 3600000,
			httpOnly: true,
			signed: true,
		});

		// 응답
		res.status(StatusCodes.CREATED).json({
			message: "POST /auth/email/verification",
		});
	} catch (error) {
		console.error(error);

		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "internal server error",
		});
	}
};

const updateVerificationRequest = async (req: Request, res: Response) => {
	const jwtPayload = (req as any).registerInfo;

	try {
		// if (jwtPayload.status !== 3) {
		// 	res.status(StatusCodes.UNAUTHORIZED).end();
		// }

		// 인증 번호 생성
		const code = generateRandomNumber(6);

		// DB 리소스 생성
		await updateVerification(jwtPayload.email, code);

		res.status(StatusCodes.OK).json({
			message: "PATCH /auth/email/verification",
		});
	} catch (error) {
		console.error(error);

		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "internal server error",
		});
	}
};

const deleteVerificationRequest = async (req: Request, res: Response) => {
	const jwtPayload = (req as any).registerInfo;

	try {
		// if (jwtPayload.status !== 6) {
		// 	res.status(StatusCodes.UNAUTHORIZED).end();
		// }

		// 쿠키 삭제
		res.clearCookie("register_token");

		// DB 리소스 생성
		await deleteVerification(jwtPayload.email);

		// todo: 삭제 되었는데 요청 처리되는 문제

		res.status(StatusCodes.OK).json({
			message: "DELETE /auth/email/verification",
		});
	} catch (error) {
		console.error(error);

		if ((error as any).message === "affected row 0") {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}

		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "internal server error",
		});
	}
};

const sendVerificationRequest = async (req: Request, res: Response) => {
	// const email = req.body.email;
	// try {
	// 	// 랜덤 번호 생성
	// 	const ranNum = generateRandomNumber(4);
	// 	// jwt 토큰 생성
	// 	const token = generateToken(
	// 		{
	// 			email,
	// 		},
	// 		ranNum,
	// 		"5m"
	// 	);
	// 	// 매일 발송
	// 	await sendAuthMail(email, ranNum);
	// 	// 응답
	// 	res.status(StatusCodes.OK).json({ token });
	// } catch (error) {
	// 	console.error(error);
	// 	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
	// 		message: "서버 에러",
	// 	});
	// }

	res.status(StatusCodes.OK).json({
		message: "POST /auth/email/send-verification",
	});
};

const verifyRequest = (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({
		message: "POST /auth/email/verify",
	});
};

export {
	createVerificationRequest,
	updateVerificationRequest,
	deleteVerificationRequest,
	sendVerificationRequest,
	verifyRequest,
};
