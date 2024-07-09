import app from "./app";
import { connectDB } from "./db/connection";

/**
 * DB 연결 후 API 서버 실행
 */
connectDB()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Start server on port ${process.env.PORT}!`);
		});
	})
	.catch(error => {
		console.error("Failed to connect to database", error);
	});
