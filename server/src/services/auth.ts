import { QueryResult, ResultSetHeader } from "mysql2";
import dotenv from "dotenv";

import { createRandomNumber } from "../utils/random";
import {
	insertVerification,
	deleteVerification,
	updateVerification,
	getCodeById,
} from "../db/context/verifications";
import { TVerificationsShema } from "../types";

dotenv.config();

/**
 * 새로운 인증 번호 생성
 */
const createNewVerification = async (): Promise<ResultSetHeader> => {
	const code = createRandomNumber(6);
	const [result] = await insertVerification(code);

	return result as ResultSetHeader;
};

/**
 * 인증 코드 조회
 */
const findCodeById = async (id: number): Promise<object> => {
	const result = await getCodeById(id);

	return result;
};

/**
 * 존재하는 인증 번호 수정
 */
const updateCodeById = async (id: number): Promise<ResultSetHeader> => {
	const code = createRandomNumber(6);
	const [result] = await updateVerification(id, code);

	return result as ResultSetHeader;
};

/**
 * 이메일로 찾은 인증 번호 삭제
 */
const removeVerificationById = async (id: number): Promise<ResultSetHeader> => {
	const result = await deleteVerification(id);

	return result as ResultSetHeader;
};

/**
 * 인증 번호 조회 및 검증
 */
const verifyCode = async (id: number, reqCode: string): Promise<boolean> => {
	const [{ code }] = (await getCodeById(id)) as Array<TVerificationsShema>;

	// 검증
	const isVerify = reqCode === code ? true : false;

	return isVerify;
};

export {
	createNewVerification,
	findCodeById,
	updateCodeById,
	removeVerificationById,
	verifyCode,
};
