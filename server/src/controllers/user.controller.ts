import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const register = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 회원가입
};

export const login = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 로그인
};

export const emailAuth = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 이메일 인증
	res.status(StatusCodes.OK).json({ message: "성공적인 응답" });
};

export const emailAuthCheck = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// TODO: 이메일 인증 번호 확인
};
