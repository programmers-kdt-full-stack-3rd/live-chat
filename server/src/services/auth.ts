import dotenv from "dotenv";

import {
	insertVerification,
	deleteVerification,
	updateVerificationCode,
	getCodeByJti,
} from "../db/context/verifications";
import { createRandomNumber } from "../utils/random";
import { BadRequestError, UnauthorizedError } from "../errors";
import { ITokenDTO, IVerificationDTO } from "../types";
import { createToken } from "./token";

dotenv.config();

/**
 * 새로운 인증 번호 생성하고 토큰 발급
 */
const generateVerification = async (
	verificationDTO: IVerificationDTO
): Promise<IVerificationDTO> => {
	const verification = {
		...verificationDTO,
		authToken: {
			...verificationDTO.authToken,
			payload: { ...verificationDTO.authToken?.payload },
		} as ITokenDTO,
	};

	// 코드 생성
	verification.code = createRandomNumber(6);

	// 토큰 발급
	verification.authToken = createToken({
		...verification.authToken,
	} as const);

	// 결과 에러 핸들링
	const result = await insertVerification(verification);

	if (result.affectedRows !== 1) throw new Error("");

	return verification;
};

/**
 * 인증 코드 조회
 */
const findVerification = async (
	verificationDTO: IVerificationDTO
): Promise<IVerificationDTO> => {
	const verification = {
		...verificationDTO,
		authToken: {
			...verificationDTO.authToken,
			payload: { ...verificationDTO.authToken?.payload },
		} as ITokenDTO,
	};

	const rows = await getCodeByJti(verificationDTO);

	if (rows.length === 0) {
		throw new BadRequestError("없는 코드 입니다.");
	}

	verification.code = rows[0].code;

	return verification;
};

/**
 * 인증 번호 수정
 */
const changeCode = async (verificationDTO: IVerificationDTO): Promise<void> => {
	const verification = {
		...verificationDTO,
		token: {
			...verificationDTO.authToken,
			payload: { ...verificationDTO.authToken?.payload },
		} as ITokenDTO,
	};

	verification.code = createRandomNumber(6);
	const result = await updateVerificationCode(verification);

	if (result.affectedRows !== 1) throw new Error();
};

/**
 * 이메일 인증 정보 삭제
 */
const removeVerification = async (
	verificationDTO: IVerificationDTO
): Promise<void> => {
	const result = await deleteVerification(verificationDTO);

	if (result.affectedRows !== 1) throw new Error();
};

/**
 * 인증 번호 조회 및 검증
 */
const verifyCode = async (verificationDTO: IVerificationDTO): Promise<void> => {
	const rows = await getCodeByJti(verificationDTO);

	if (rows.length !== 1) throw new Error("");

	const code = rows[0].code;

	// 검증
	const isVerify = verificationDTO.code! === code ? true : false;

	if (!isVerify) throw new UnauthorizedError("잘못된 코드입니다.");
};

/**
 * 이메일 인증 확인
 */
const checkVerifyEmail = (tokenDTO: ITokenDTO, verified: boolean): void => {
	if (tokenDTO.payload!.verified !== verified) {
		if (verified)
			throw new BadRequestError("이메일 인증이 이뤄지지 않았습니다.");
		else throw new BadRequestError("이미 인증되었습니다.");
	}
};

export {
	generateVerification,
	findVerification,
	changeCode,
	removeVerification,
	verifyCode,
	checkVerifyEmail,
};
