import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";

import { IRegisterTokenPayload, IRequest } from "../types";
import { UnauthorizedError } from "../errors";

dotenv.config();

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
		(req as IRequest).registerInfo = decoded;

		next();
	} catch (error) {
		// 토큰 만료
		if (error instanceof TokenExpiredError) {
			error = new UnauthorizedError();
		}

		next(error);
	}
};

/**
 * register 순서 토큰 검증
 */

export { verifyToken };
