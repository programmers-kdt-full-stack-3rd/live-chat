import { connectDB } from "../connection";

/**
 * 인증 번호 생성
 */
const insertVerification = async (email: string, code: string) => {
	const connection = await connectDB();
	const result = await connection.query(
		`INSERT INTO verifications (email, code) VALUES (?, ?)`,
		[email, code]
	);

	return result;
};

/**
 * 인증 번호 조회
 */
const getVerificationByValue = async (value: string | number) => {
	const column = typeof value === "string" ? "email" : "id";

	const connection = await connectDB();
	const [rows] = await connection.query(
		`SELECT * FROM verifications WHERE ${column}=?`,
		[value]
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
	getVerificationByValue,
	updateVerification,
	deleteVerification,
};
