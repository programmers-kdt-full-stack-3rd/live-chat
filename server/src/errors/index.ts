import { StatusCodes } from "http-status-codes";
import { IError } from "../types/index";

class BadRequestError extends Error implements IError {
	statusCode?: number | undefined;

	constructor(message = "잘못된 요청입니다.") {
		super(message);
		this.name = "BadRequestError";
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

class UnauthorizedError extends Error implements IError {
	statusCode?: number | undefined;

	constructor(message = "인증 정보가 잘못되었습니다.") {
		super(message);
		this.name = "UnauthorizedError";
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

class ForbiddenError extends Error implements IError {
	statusCode?: number | undefined;

	constructor(message = "접근 권한이 없습니다.") {
		super(message);
		this.name = "ForbiddenError";
		this.statusCode = StatusCodes.FORBIDDEN;
	}
}

class NotFoundError extends Error implements IError {
	statusCode?: number | undefined;

	constructor(message = "해당 리소스를 찾을 수 없습니다.") {
		super(message);
		this.name = "NotFoundError";
		this.statusCode = StatusCodes.NOT_FOUND;
	}
}

export { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError };
