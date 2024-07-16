import express from "express";
import { checkSchema } from "express-validator";

import { register, login } from "../controllers/user.controller";
import {
	mergeSignedCookiesIntoCookies,
	validate,
} from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validations/user.validation";
import { verifyTokens } from "../middlewares/auth";

const router = express.Router();
router.use(express.json());

/**
 * 엔드포인트 정의
 */
router.post(
	"/register",
	mergeSignedCookiesIntoCookies,
	checkSchema(registerSchema),
	validate,
	verifyTokens("auth_token"),
	register
);
router.post(
	"/login",
	mergeSignedCookiesIntoCookies,
	checkSchema(loginSchema),
	validate,
	login
);

export default router;
