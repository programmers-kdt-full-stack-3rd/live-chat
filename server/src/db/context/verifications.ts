import { connectDB } from "../connection";

// 인증 번호 저장
const addVerification = async (email: string, code: string) => {
	const connection = await connectDB();
	await connection.query(
		`INSERT INTO verifications (email, code) VALUES (?, ?)`,
		[email, code]
	);
};

export { addVerification };
