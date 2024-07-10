import { Schema } from "express-validator";
import { DefaultSchemaKeys } from "express-validator/lib/middlewares/schema";

/**
 * email-auth 유효성 검사 schema
 */
const emailAuthSchema: Schema<DefaultSchemaKeys> = {
	email: { in: ["body"], isEmail: true },
	created_at: {
		in: ["body"],
		isTime: {
			options: {
				hourFormat: "hour24",
				mode: "withSeconds",
			},
		},
	},
};

export { emailAuthSchema };
