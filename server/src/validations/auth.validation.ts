import { Schema } from "express-validator";
import { DefaultSchemaKeys } from "express-validator/lib/middlewares/schema";

const emailSchema: Schema<DefaultSchemaKeys> = {
	email: { in: ["body"], isEmail: true, normalizeEmail: true },
};

const cookieJWTSchema: Schema<DefaultSchemaKeys> = {
	authToken: {
		in: ["cookies"],
		isJWT: true,
	},
};

const verifySchema: Schema<DefaultSchemaKeys> = {
	authToken: {
		in: ["cookies"],
		isJWT: true,
	},
	code: {
		in: ["body"],
		isString: true,
		isLength: {
			options: { min: 6, max: 6 },
		},
	},
};

export { emailSchema, cookieJWTSchema, verifySchema };
