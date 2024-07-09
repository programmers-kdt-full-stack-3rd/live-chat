import dotenv from "dotenv";

dotenv.config();

/**
 * DB 설정
 */
const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};

export default config;
