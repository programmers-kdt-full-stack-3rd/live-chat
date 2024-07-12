import { Request, Response, NextFunction } from "express";
import { IError } from "../types";
import {
	BadRequestError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
} from "../errors";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (
	err: IError,
	req: Request,
	res: Response,
	_: NextFunction
) => {
	console.error(err.stack);

	if (
		err instanceof BadRequestError ||
		err instanceof UnauthorizedError ||
		err instanceof ForbiddenError ||
		err instanceof NotFoundError
	) {
		return res.status(err.statusCode!).json({
			message: err.message,
		});
	}

	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ message: "서버 내부 오류입니다." });
};

export default globalErrorHandler;
