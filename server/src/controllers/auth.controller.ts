import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { generateToken } from "../services/auth";
import { generateRandomNumber } from "../utils/random";
import { addVerification } from "../db/context/verifications";
// import { sendAuthMail } from "../services/mail";

const createVerification = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		// 인증 번호 생성
		const code = generateRandomNumber(6);

		// DB 리소스 생성
		await addVerification(email, code);

		// token 발급
		const token = generateToken({ email }, "60m");
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

const updateVerification = (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({
		message: "PATCH /auth/email/verification",
	});
};

const deleteVerification = (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({
		message: "DELETE /auth/email/verification",
	});
};

const sendVerification = async (req: Request, res: Response) => {
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

const verify = (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({
		message: "POST /auth/email/verify",
	});
};

export {
	createVerification,
	updateVerification,
	deleteVerification,
	sendVerification,
	verify,
};
