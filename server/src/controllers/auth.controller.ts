import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createToken } from "../services/token";
import {
	createNewVerification,
	findVerificationByEmail,
	findVerificationById,
	removeVerificationById,
	updateExistingVerification,
} from "../services/auth";
import { sendAuthMail } from "../services/mail";
import {
	IAffectedRows,
	IInsertId,
	IRequest,
	IVerificationShema,
} from "../types/index";
import { BadRequestError } from "../errors";

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
		// TODO: 회원가입 세션, 유저 이메일 DB 조회 한번으로 해결
		// 인증 번호 조회
		const result = (await findVerificationByEmail(email)) as Array<object>;

		if (result.length > 0) {
			throw new BadRequestError();
		}

		// 인증 번호 생성 및 DB에 리소스 생성
		const { insertId } = (await createNewVerification(email)) as IInsertId;

		// 토큰 발급
		const token = createToken({ id: insertId, status: 0 }, "1h");

		// 쿠키 설정
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
	const { id, status } = (req as IRequest).registerInfo;

	try {
		// TODO: 회원가입 세션 확인

		// 인증 번호 생성 및 DB에 리소스 생성
		const { affectedRows } = (await updateExistingVerification(
			id
		)) as IAffectedRows;

		if (affectedRows !== 1) throw new BadRequestError();

		// 토큰 발급
		const token = createToken({ id, status: 4 }, "1h");

		// 쿠키 설정
		res.cookie("register_token", token, {
			maxAge: 3600000,
			httpOnly: true,
			signed: true,
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
	const { id, status } = (req as IRequest).registerInfo;

	try {
		// TODO: 회원가입 세션 확인

		// DB 리소스 생성
		const { affectedRows } = (await removeVerificationById(
			id
		)) as IAffectedRows;

		if (affectedRows !== 1) {
			throw new BadRequestError();
		}

		// 쿠키 삭제
		res.clearCookie("register_token");

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
	const { id, status } = (req as IRequest).registerInfo;

	try {
		// TODO: 회원가입 세션 확인

		// 인증 번호 조회
		const result = (await findVerificationById(
			id
		)) as Array<IVerificationShema>;

		if (result.length === 0) {
			throw new BadRequestError();
		}

		const { email, code } = result[0];

		// 메일 발송
		await sendAuthMail(email, code);

		// 토큰 발급
		const token = createToken({ id, status: 2 }, "1h");

		// 쿠키 설정
		res.cookie("register_token", token, {
			maxAge: 3600000,
			httpOnly: true,
			signed: true,
		});

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
