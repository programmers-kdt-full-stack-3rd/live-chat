import { RowDataPacket } from "mysql2";
import { connectDB } from "../connection";
import { TUsersSchema } from "../../types";

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

const getUserByEmail = async (email: string): Promise<TUsersSchema[]> => {
	const connection = await connectDB();
	const [rows] = await connection.query<RowDataPacket[]>(
		`SELECT id, name, password_hash, salt FROM users
        WHERE email=?`,
		[email]
	);

	return rows as TUsersSchema[];
};

export { insertUser, getUserByEmail };
