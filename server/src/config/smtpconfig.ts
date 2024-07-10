import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

dotenv.config();

const config: SMTPTransport.Options = {
	service: "naver",
	host: "smtp.naver.com",
	port: 587, // TLS 사용
	secure: false,
	requireTLS: true,
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
};

export default config;
