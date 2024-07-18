import { Request } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

/**
 * express 관련 타입 및 인터페이스
 */

interface IRequest extends Request {
	authToken?: ITokenDTO;
	accessToken?: ITokenDTO;
	refreshToken?: ITokenDTO;
	verification?: IVerificationDTO;
	user?: IUserDTO;
	userSession?: IUserSessionDTO;
}

/**
 * DTO 타입 및 인터페이스
 */

// 이메일 인증 DTO
interface IVerificationDTO {
	id?: number;
	code?: string;
	authToken?: ITokenDTO;
	expiredAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

// 사용자 DTO
interface IUserDTO {
	id?: number;
	email?: string;
	name?: string;
	password?: string;
	passwordHash?: string;
	salt?: string;
	cretedAt?: Date;
	updatedAt?: Date;
}

// 사용자 세션 DTO
interface IUserSessionDTO {
	id?: number;
	clientId?: string;
	userId?: number;
	userName?: string;
	userAgent?: string;
	ipAddress?: string;
	refreshToken?: string;
	revoked?: boolean;
	expiredAt?: Date;
	cretedAt?: Date;
	updatedAt?: Date;
	lastAccessedAt?: Date;
}

// 토큰 DTO
interface ITokenDTO {
	token?: string;
	secretKey?: string;
	payload?: IAuthTokenPayload | IAccessTokenPayload | IRefreshTokenPayload;
}

interface IAuthTokenPayload extends JwtPayload {
	verified?: boolean;
}

interface IAccessTokenPayload extends JwtPayload {}

interface IRefreshTokenPayload extends JwtPayload {
	clientId: string;
}

/**
 * 에러 관련 타입 및 인터페이스
 */

interface IError extends Error {
	statusCode?: number;
}

export {
	IRequest,
	IVerificationDTO,
	IUserDTO,
	IUserSessionDTO,
	ITokenDTO,
	IError,
};
