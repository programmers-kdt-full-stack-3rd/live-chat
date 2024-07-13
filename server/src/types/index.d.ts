import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// DB 관련 타입 및 인터페이스
interface IInsertId {
	insertId: number;
}

interface IAffectedRows {
	affectedRows: number;
}

interface IVerificationShema {
	id: number;
	email: string;
	code: string;
	expired_at: Date;
	created_at: Date;
	updated_at: Date;
}

// express 관련 타입 및 인터페이스
interface IRequest extends Request {
	registerInfo: IRegisterTokenPayload;
}

// jwt 토큰 관련 타입 및 인터페이스
interface IRegisterTokenPayload extends JwtPayload {
	id: number;
	status: number;
}

// error 관련 타입 및 인터페이스
interface IError extends Error {
	statusCode?: number;
}

export {
	IInsertId,
	IAffectedRows,
	IVerificationShema,
	IRequest,
	IRegisterTokenPayload,
	IError,
};
