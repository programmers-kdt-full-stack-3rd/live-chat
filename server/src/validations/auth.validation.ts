import { Schema } from "express-validator";
import { DefaultSchemaKeys } from "express-validator/lib/middlewares/schema";

const createVerificationSchema: Schema<DefaultSchemaKeys> = {
	email: { in: ["body"], isEmail: true, normalizeEmail: true },
};

const updateVerificationSchema: Schema<DefaultSchemaKeys> = {
	// register_token: {
	// 	in: ["cookies"],
	// 	isJWT: true,
	// },
	// email: { in: ["body"], isEmail: true, normalizeEmail: true },
};

const deleteVerificationSchema: Schema<DefaultSchemaKeys> = {
	// register_token: {
	// 	in: ["cookies"],
	// 	isJWT: true,
	// },
	// email: { in: ["body"], isEmail: true, normalizeEmail: true },
};

const sendVerificationSchema: Schema<DefaultSchemaKeys> = {
	// register_token: {
	// 	in: ["cookies"],
	// 	isJWT: true,
	// },
	// email: { in: ["body"], isEmail: true, normalizeEmail: true },
};

const verifySchema: Schema<DefaultSchemaKeys> = {
	// register_token: {
	// 	in: ["cookies"],
	// 	isJWT: true,
	// },
	// email: { in: ["body"], isEmail: true, normalizeEmail: true },
	// code: {
	// 	in: ["body"],
	// 	isLength: {
	// 		options: { min: 4, max: 4 },
	// 	},
	// },
};

export {
	createVerificationSchema,
	updateVerificationSchema,
	deleteVerificationSchema,
	sendVerificationSchema,
	verifySchema,
};
