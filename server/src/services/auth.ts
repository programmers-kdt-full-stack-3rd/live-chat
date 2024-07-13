import dotenv from "dotenv";

import { createRandomNumber } from "../utils/random";
import {
	insertVerification,
	deleteVerification,
	updateVerification,
	getVerificationByEmail,
} from "../db/context/verifications";

dotenv.config();

/**
 * 인증 번호 조회
 */
const findVerificationByEmail = async (email: string): Promise<object> => {
	const result = await getVerificationByEmail(email);

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
	console.log(result);
	return result;
};

export {
	findVerificationByEmail,
	createNewVerification,
	updateExistingVerification,
	removeVerificationById,
};
