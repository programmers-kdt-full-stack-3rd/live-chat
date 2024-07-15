import { connectDB } from "../connection";

/**
 * 인증 번호 생성
 */
const insertVerification = async (code: string) => {
	const connection = await connectDB();
	const result = await connection.query(
		`INSERT INTO verifications (code, expired_at) VALUES (?, ?)`,
		[code, new Date(Date.now() + 300000)]
	);

	return result;
};

/**
 * 인증 코드 조회
 */
const getCodeById = async (id: number) => {
	const connection = await connectDB();
	const [rows] = await connection.query(
		`SELECT code FROM verifications WHERE id=?`,
		[id]
	);

	return rows;
};

/**
 * 인증 번호 수정
 */
const updateVerification = async (id: number, code: string) => {
	const connection = await connectDB();
	const result = await connection.query(
		`
		UPDATE verifications
		SET code=?
		WHERE id=?
		`,
		[code, id]
	);

	return result;
};

/**
 * 인증 번호 삭제
 */
const deleteVerification = async (id: number) => {
	const connection = await connectDB();
	const [result] = await connection.query(
		`
		DELETE FROM verifications
		WHERE id=?
		`,
		[id]
	);

	return result;
};

export {
	insertVerification,
	getCodeById,
	updateVerification,
	deleteVerification,
};
