import { ResultSetHeader } from "mysql2";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import {
	insertVerification,
	deleteVerification,
	updateVerification,
	getCodeByJti,
} from "../db/context/verifications";
import { createRandomNumber } from "../utils/random";
import { TVerificationsShema } from "../types";

dotenv.config();

/**
 * 새로운 인증 번호 생성
 */
const createNewVerification = async (): Promise<string> => {
	const code = createRandomNumber(6);
	const jti = uuidv4();
	await insertVerification(jti, code);

	return jti;
};

/**
 * 인증 코드 조회
 */
const findCodeByJti = async (jti: string): Promise<object> => {
	const result = await getCodeByJti(jti);

	return result;
};

/**
 * 존재하는 인증 번호 수정
 */
const updateCodeByJti = async (jti: string): Promise<ResultSetHeader> => {
	const code = createRandomNumber(6);
	const [result] = await updateVerification(jti, code);

	return result as ResultSetHeader;
};

/**
 * 이메일로 찾은 인증 번호 삭제
 */
const removeVerificationByJti = async (
	jti: string
): Promise<ResultSetHeader> => {
	const result = await deleteVerification(jti);

	return result as ResultSetHeader;
};

/**
 * 인증 번호 조회 및 검증
 */
const verifyCode = async (jti: string, reqCode: string): Promise<boolean> => {
	const [{ code }] = (await getCodeByJti(jti)) as Array<TVerificationsShema>;

	// 검증
	const isVerify = reqCode === code ? true : false;

	return isVerify;
};

export {
	createNewVerification,
	findCodeByJti,
	updateCodeByJti,
	removeVerificationByJti,
	verifyCode,
};
