import { connectDB } from "../connection";

const insertUser = async (
	email: string,
	name: string,
	passwordHash: string,
	salt: string
) => {
	const connection = await connectDB();
	const result = await connection.query(
		`INSERT INTO users
        (email, name, salt, password_hash) VALUES (?, ?, ?, ?)`,
		[email, name, passwordHash, salt]
	);

	return result;
};

export { insertUser };
