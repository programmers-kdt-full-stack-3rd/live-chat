/**
 * 입력폼 관련 타입 및 인터페이스
 */

interface ILoginState {
	email: string;
	password: string;
}

interface ILoginRequest {
	email: string;
	password: string;
}

export type { ILoginState, ILoginRequest };
