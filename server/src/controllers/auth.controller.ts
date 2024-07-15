import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";

import { TVerificationsShema, IRequest } from "../types/index";

import { createToken } from "../services/token";
import {
	createNewVerification,
	findCodeById,
	removeVerificationById,
	updateCodeById,
	verifyCode,
} from "../services/auth";
import { sendAuthMail } from "../services/mail";

import { BadRequestError, UnauthorizedError } from "../errors";

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
		// 인증 번호 생성 및 DB에 리소스 생성
		const { insertId } = await createNewVerification();

		// 토큰 발급
		const token = createToken(
			{
				verificationId: insertId,
				email,
				verified: false,
			},
			"5m"
		);

		// 쿠키 설정
		res.cookie("auth_token", token, {
			maxAge: 600000,
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
	const { verificationId, verified } = (req as IRequest).tokenDecodedInfo;

	try {
		// 인증된 이메일인지 확인
		if (verified) throw new BadRequestError("이미 인증되었습니다.");

		// 인증 번호 생성 및 인증번호 변경
		const { affectedRows } = await updateCodeById(verificationId);

		if (affectedRows !== 1) throw new BadRequestError();

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
	const { verificationId, verified } = (req as IRequest).tokenDecodedInfo;

	try {
		// 인증된 이메일인지 확인
		if (!verified) throw new BadRequestError("인증이 되지 않았습니다.");

		// DB 리소스 삭제
		const { affectedRows } = await removeVerificationById(verificationId);

		if (affectedRows !== 1) {
			throw new BadRequestError();
		}

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
	const { email, verificationId, verified } = (req as IRequest)
		.tokenDecodedInfo;

	try {
		// 인증된 이메일인지 확인
		if (verified) {
			throw new BadRequestError("이미 인증되었습니다.");
		}

		// 인증 번호 조회
		const result = (await findCodeById(
			verificationId
		)) as Array<TVerificationsShema>;

		// 조회 안될 시 오류
		if (result.length === 0) {
			throw new BadRequestError();
		}

		const { code } = result[0];

		// 메일 발송
		await sendAuthMail(email!, code);

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
	const { code } = req.body;
	const { verificationId, email, verified } = (req as IRequest)
		.tokenDecodedInfo;

	try {
		// 인증된 이메일인지 확인
		if (verified) {
			throw new BadRequestError("이미 인증되었습니다.");
		}

		// 인증 번호 조회
		const result = (await findCodeById(
			verificationId
		)) as Array<TVerificationsShema>;

		// 조회 안될 시 오류
		if (result.length === 0) {
			throw new BadRequestError();
		}

		// 인증 번호 검증
		const isVerify = await verifyCode(verificationId, code);

		// 실패시 에러
		if (!isVerify) throw new UnauthorizedError("잘못된 코드입니다.");

		// 토큰 발급
		const token = createToken(
			{
				verificationId,
				email,
				verified: true,
			},
			"1h"
		);

		// 쿠키 설정
		res.cookie("auth_token", token, {
			maxAge: 3600000,
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
