import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IVerificationDTO } from "../../types";
import { connectDB } from "../connection";

/**
 * 인증 번호 추가
 */
const insertVerification = async (
	verificationDTO: IVerificationDTO
): Promise<ResultSetHeader> => {
	const connection = await connectDB();
	const [result] = await connection.query<ResultSetHeader>(
		`INSERT INTO verifications (jti, code, expired_at) VALUES (?, ?, ?)`,
		[
			verificationDTO.authToken!.payload!.jti!,
			verificationDTO.code,
			verificationDTO.expiredAt,
		]
	);

	return result;
};

/**
 * 인증 코드 조회
 */
const getCodeByJti = async (
	verificationDTO: IVerificationDTO
): Promise<IVerificationDTO[]> => {
	const connection = await connectDB();
	const [rows] = await connection.query<RowDataPacket[]>(
		`SELECT code FROM verifications WHERE jti=?`,
		[verificationDTO.authToken!.payload!.jti!]
	);

	return rows as IVerificationDTO[];
};

/**
 * 인증 번호 수정
 */
const updateVerificationCode = async (
	verificationDTO: IVerificationDTO
): Promise<ResultSetHeader> => {
	const connection = await connectDB();
	const [result] = await connection.query<ResultSetHeader>(
		`
		UPDATE verifications
		SET code=?
		WHERE jti=?
		`,
		[verificationDTO.code, verificationDTO.authToken!.payload!.jti!]
	);

	return result;
};

/**
 * 인증 번호 삭제
 */
const deleteVerification = async (
	verificationDTO: IVerificationDTO
): Promise<ResultSetHeader> => {
	const connection = await connectDB();
	const [result] = await connection.query<ResultSetHeader>(
		`
		DELETE FROM verifications
		WHERE jti=?
		`,
		[verificationDTO.authToken!.payload!.jti!]
	);

	return result;
};

export {
	insertVerification,
	getCodeByJti,
	updateVerificationCode,
	deleteVerification,
};
