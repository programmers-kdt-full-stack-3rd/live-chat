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

/**
 * 토큰 관련 타입 및 인터페이스
 */

// express request에 token decoded 정보 추가
interface IRequest extends Request {
	tokenDecodedInfos?: TTokenDocodedInfos;
}

type TTokenDocodedInfos = {
	authInfo?: IAuthInfo;
	accessInfo?: IAccessInfo;
	refreshInfo?: IRefreshInfo;
};

interface IJwtPayload extends JwtPayload {
	jti: string;
}

interface IAuthInfo extends IJwtPayload {
	verified: boolean;
	email: string;
}

interface IAccessInfo extends IJwtPayload {
	userName: boolean;
}

interface IRefreshInfo extends IJwtPayload {}

/**
 * 에러 관련 타입 및 인터페이스
 */

interface IError extends Error {
	statusCode?: number;
}

export {
	TVerificationsShema,
	IRequest,
	TTokenDocodedInfos,
	IAuthInfo,
	IAccessInfo,
	IRefreshInfo,
	IError,
};
