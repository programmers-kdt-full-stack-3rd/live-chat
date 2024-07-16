import { connectDB } from "../connection";

/**
 * 인증 번호 생성
 */
const insertVerification = async (jti: string, code: string) => {
	const connection = await connectDB();
	const result = await connection.query(
		`INSERT INTO verifications (jti, code, expired_at) VALUES (?, ?, ?)`,
		[jti, code, new Date(Date.now() + 300000)]
	);

	return result;
};

/**
 * 인증 코드 조회
 */
const getCodeByJti = async (jti: string) => {
	const connection = await connectDB();
	const [rows] = await connection.query(
		`SELECT code FROM verifications WHERE id=?`,
		[jti]
	);

	return rows;
};

/**
 * 인증 번호 수정
 */
const updateVerification = async (jti: string, code: string) => {
	const connection = await connectDB();
	const result = await connection.query(
		`
		UPDATE verifications
		SET code=?
		WHERE jti=?
		`,
		[code, jti]
	);

	return result;
};

/**
 * 인증 번호 삭제
 */
const deleteVerification = async (jti: string) => {
	const connection = await connectDB();
	const [result] = await connection.query(
		`
		DELETE FROM verifications
		WHERE jti=?
		`,
		[jti]
	);

	return result;
};

export {
	insertVerification,
	getCodeByJti,
	updateVerification,
	deleteVerification,
};
