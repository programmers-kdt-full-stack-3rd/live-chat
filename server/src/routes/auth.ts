import express, { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";

import {
	createVerification,
	deleteVerification,
	sendVerification,
	updateVerification,
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
	updateVerification
);
router.delete(
	"/email/verification",
	mergeSignedCookiesIntoCookies,
	checkSchema(cookieJWTSchema),
	validate,
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
	verify
);

export default router;
