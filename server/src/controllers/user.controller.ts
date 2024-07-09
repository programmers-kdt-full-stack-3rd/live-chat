import { Request, Response, NextFunction } from "express";

export const register = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 회원가입
};

export const login = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 로그인
};

export const emailAuth = (req: Request, res: Response, next: NextFunction) => {
	// TODO: 이메일 인증
};

export const emailAuthCheck = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// TODO: 이메일 인증 번호 확인
};
