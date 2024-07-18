import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

/**
 * HTTP Requests 유효성 검사
 */
const validate = (req: Request, res: Response, next: NextFunction) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		return next();
	}

	res.status(StatusCodes.BAD_REQUEST).json({
		errors: result.array(),
	});
};

/**
 * signed cookies를 cookies 객체에 병합
 */
const mergeSignedCookiesIntoCookies = (
	req: Request,
	_: Response,
	next: NextFunction
) => {
	const signedCookies = req.signedCookies;
	const cookies = req.cookies;

	try {
		for (const key of Object.keys(signedCookies)) {
			if (!!cookies.key) {
				throw new BadRequestError("서명되지 않은 쿠키가 있습니다.");
			}

			cookies[key] = signedCookies[key];
		}

		next();
	} catch (error) {
		next(error);
	}
};

export { validate, mergeSignedCookiesIntoCookies };
