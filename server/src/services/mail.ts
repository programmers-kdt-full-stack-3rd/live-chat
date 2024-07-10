import { createTransport, Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import dotenv from "dotenv";

import smtpconfig from "../config/smtpconfig";

dotenv.config();

let transporter: Transporter | null = null;

/**
 * 인증 메일 발송
 */
const sendAuthMail = async (to: string, ranNum: string) => {
	if (!transporter) {
		transporter = createTransport(smtpconfig);
	}

	const mailOptions: Mail.Options = {
		from: process.env.NODEMAILER_EMAIL,
		to,
		subject: "live-chat 인증 번호 발송 메일",
		text: `인증 번호 : ${ranNum}`,
	};

	return await transporter.sendMail(mailOptions);
};

export { sendAuthMail };
