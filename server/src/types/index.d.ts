import { Request } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";

/**
 * DB 관련 타입 및 인터페이스
 */

// verifications 스키마
type TVerificationsShema = {
	id: number;
	email: string;
	code: string;
	expired_at: Date;
	created_at: Date;
	updated_at: Date;
};

// users 스키마
type TUsersSchema = {
	id: number;
	email: string;
	name: string;
	password_hash: string;
	salt: string;
	creted_at: Date;
	updated_at: Date;
};

/**
 * 토큰 관련 타입 및 인터페이스
 */

type TTokenDocodedInfos = {
	authInfo?: IAuthInfo;
	accessInfo?: IAccessInfo;
	refreshInfo?: IRefreshInfo;
};

interface IRequest extends Request {
	tokenDecodedInfos?: TTokenDocodedInfos;
}

interface IJwtPayload extends JwtPayload {
	jti: string;
}

interface IAuthInfo extends IJwtPayload {
	verified: boolean;
	email: string;
}

interface IAccessInfo extends IJwtPayload {
	userId: number;
}

interface IRefreshInfo extends IJwtPayload {
	userId: number;
	userAgent;
}

/**
 * 에러 관련 타입 및 인터페이스
 */

interface IError extends Error {
	statusCode?: number;
}

export {
	TVerificationsShema,
	TUsersSchema,
	IRequest,
	TTokenDocodedInfos,
	IAuthInfo,
	IAccessInfo,
	IRefreshInfo,
	IError,
};
