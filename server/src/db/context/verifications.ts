import { connectDB } from "../connection";

// 인증 번호 저장
const addVerification = async (email: string, code: string) => {
	const connection = await connectDB();
	await connection.query(
		`INSERT INTO verifications (email, code) VALUES (?, ?)`,
		[email, code]
	);
};

const getVerification = async (email: string) => {
	const connection = await connectDB();
	const [rows] = await connection.query(
		`SELECT * FROM verifications WHERE email=?`,
		[email]
	);

	return rows;
};

const updateVerification = async (email: string, code: string) => {
	const connection = await connectDB();
	await connection.query(
		`
		UPDATE verifications
		SET code=?
		WHERE email=?
		`,
		[code, email]
	);
};

const deleteVerification = async (email: string) => {
	const connection = await connectDB();
	const [result] = await connection.query(
		`
		DELETE FROM verifications
		WHERE email=?
		`,
		[email]
	);

	const affectedRows = (result as any).affectedRows;

	if (affectedRows === 0) {
		const err = new Error();
		throw Error("affected row 0");
	}
	console.log(result);
};

export {
	addVerification,
	getVerification,
	updateVerification,
	deleteVerification,
};
