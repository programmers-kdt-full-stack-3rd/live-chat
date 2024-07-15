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
	tokenDecodedInfo: IAuthTokenPayload;
}

interface IAuthTokenPayload extends JwtPayload {
	verificationId: number;
	verified: boolean;
	email: string;
}

/**
 * 에러 관련 타입 및 인터페이스
 */

interface IError extends Error {
	statusCode?: number;
}

export { TVerificationsShema, IRequest, IError, IAuthTokenPayload };
