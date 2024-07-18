import { Schema } from "express-validator";
import { DefaultSchemaKeys } from "express-validator/lib/middlewares/schema";

const registerSchema: Schema<DefaultSchemaKeys> = {
	authToken: {
		in: ["cookies"],
		isJWT: true,
	},
	password: {
		in: ["body"],
		isString: true,
		isLength: {
			errorMessage: "비밀번호는 최소 8자 이상, 20자 이하여야 합니다.",
			options: { min: 8, max: 20 },
		},
		matches: {
			errorMessage:
				"비밀번호는 최소 하나의 소문자, 대문자, 숫자, 특수 문자를 포함해야 합니다.",
			options: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
		},
	},
	name: {
		in: ["body"],
		isString: true,
		isLength: {
			errorMessage: "이름은 최소 2자, 최대 10자 이하여야 합니다.",
			options: { min: 2, max: 10 },
		},
		matches: {
			errorMessage:
				"이름은 대소문자, 한글, 하이픈(-), 쉼표(.)만 포함되고, 대소문자 및 한글로 시작되어야 합니다.",
			options: /^[a-zA-Z가-힣]+(([. -][a-zA-Z가-힣])?[a-zA-Z가-힣]*)*$/,
		},
	},
};

const loginSchema: Schema<DefaultSchemaKeys> = {
	refreshToken: {
		in: ["cookies"],
		isJWT: true,
		optional: true,
	},
	accessToken: {
		in: ["cookies"],
		isJWT: true,
		optional: true,
	},
	email: { in: ["body"], isEmail: true, normalizeEmail: true },
	password: {
		in: ["body"],
		isString: true,
		isLength: {
			errorMessage: "비밀번호는 최소 8자 이상, 20자 이하여야 합니다.",
			options: { min: 8, max: 20 },
		},
		matches: {
			errorMessage:
				"비밀번호는 최소 하나의 소문자, 대문자, 숫자, 특수 문자를 포함해야 합니다.",
			options: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
		},
	},
};

export { registerSchema, loginSchema };
