import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";

dotenv.config();

interface IRegisterTokenPayload {
	email: string;
	status: number;
	jwt?: string;
	exp: number;
}

/**
 * 회원가입 토큰 검증
 */
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies["register_token"];

	try {
		// 토큰 검증
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY!
		) as IRegisterTokenPayload;

		(req as any).registerInfo = decoded;

		next();
	} catch (error) {
		// 토큰 만료
		if (error instanceof TokenExpiredError) {
			res.clearCookie("register_token");
			return res.status(StatusCodes.UNAUTHORIZED).end();
		}

		res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
	}
};

/**
 * register 순서 토큰 검증
 */

export { verifyToken };
