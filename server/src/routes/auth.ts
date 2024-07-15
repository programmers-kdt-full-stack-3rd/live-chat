import express from "express";
import { checkSchema } from "express-validator";

import {
	createVerification,
	updateVerification,
	deleteVerification,
	sendVerification,
	verify,
} from "../controllers/auth.controller";

import {
	emailSchema,
	cookieJWTSchema,
	verifySchema,
} from "../validations/auth.validation";
import {
	mergeSignedCookiesIntoCookies,
	validate,
} from "../middlewares/validate";
import { verifyTokens } from "../middlewares/auth";

const router = express.Router();

/**
 * 라우터 설정
 */
router.use(express.json());

/**
 * 인증 번호 CRUD API 엔드포인트
 */
router.post(
	"/email/verification",
	checkSchema(emailSchema),
	validate,
	createVerification
);
router.patch(
	"/email/verification",
	mergeSignedCookiesIntoCookies,
	checkSchema(cookieJWTSchema),
	validate,
	verifyTokens("auth_token"),
	updateVerification
);
router.delete(
	"/email/verification",
	mergeSignedCookiesIntoCookies,
	checkSchema(cookieJWTSchema),
	validate,
	verifyTokens("auth_token"),
	deleteVerification
);

/**
 * 인증 이메일 발송 API 엔드포인트
 */
router.post(
	"/email/send-verification",
	mergeSignedCookiesIntoCookies,
	checkSchema(cookieJWTSchema),
	validate,
	verifyTokens("auth_token"),
	sendVerification
);

/**
 * 인증 번호 검증 API 엔드포인트
 */
router.post(
	"/email/verify",
	mergeSignedCookiesIntoCookies,
	checkSchema(verifySchema),
	validate,
	verifyTokens("auth_token"),
	verify
);

export default router;
