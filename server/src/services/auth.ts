import dotenv from "dotenv";

import { createRandomNumber } from "../utils/random";
import {
	insertVerification,
	deleteVerification,
	updateVerification,
	getVerificationByValue,
} from "../db/context/verifications";
import { IVerificationShema } from "../types";

dotenv.config();

/**
 * 인증 번호 조회 by email
 */
const findVerificationByEmail = async (email: string): Promise<object> => {
	const result = await getVerificationByValue(email);

	return result;
};

/**
 * 인증 번호 조회 by id
 */
const findVerificationById = async (id: number): Promise<object> => {
	const result = await getVerificationByValue(id);

	return result;
};

/**
 * 새로운 인증 번호 생성
 */
const createNewVerification = async (email: string): Promise<object> => {
	const code = createRandomNumber(6);
	const [result] = await insertVerification(email, code);

	return result;
};

/**
 * 존재하는 인증 번호 수정
 */
const updateExistingVerification = async (id: number) => {
	const code = createRandomNumber(6);
	const [result] = await updateVerification(id, code);

	return result;
};

/**
 * 이메일로 찾은 인증 번호 삭제
 */
const removeVerificationById = async (id: number) => {
	const result = await deleteVerification(id);
	return result;
};

/**
 * 인증 번호 조회 및 검증
 */
const verifyCode = async (id: number, reqCode: string): Promise<boolean> => {
	const [result] = (await getVerificationByValue(
		id
	)) as Array<IVerificationShema>;

	return reqCode === result.code ? true : false;
};

export {
	findVerificationByEmail,
	findVerificationById,
	createNewVerification,
	updateExistingVerification,
	removeVerificationById,
	verifyCode,
};
