import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

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

export { validate };
