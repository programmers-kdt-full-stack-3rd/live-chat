import { createConnection, Connection } from "mysql2/promise";

import config from "../config/dbconfig";

/**
 * DB 연결 객체
 */
let conn: Connection | null = null;

/**
 * DB 연결 메서드
 */
const connectDB = async (): Promise<Connection> => {
	if (!conn) {
		conn = await createConnection(config);
	}

	return conn;
};

export { connectDB };
