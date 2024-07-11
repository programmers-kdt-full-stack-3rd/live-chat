import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// import { sendAuthMail } from "../services/mail";
// import { generateRandomNumber } from "../utils/random";
// import { generateToken } from "../services/auth";

const createVerification = (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({
		message: "POST /auth/email/verification",
	});
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
