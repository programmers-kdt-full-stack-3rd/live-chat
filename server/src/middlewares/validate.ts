import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { BadRequestError } from "../errors";

/**
 * HTTP Request 유효성 검사
 */
const validate = (req: Request, _: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}

	const errorArray = errors.array({ onlyFirstError: true });

	next(new BadRequestError(errorArray[0].msg));
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
				throw new BadRequestError();
			}

			cookies[key] = signedCookies[key];
		}

		next();
	} catch (error) {
		next(error);
	}
};

export { validate, mergeSignedCookiesIntoCookies };
