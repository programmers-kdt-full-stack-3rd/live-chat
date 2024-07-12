import express, { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";

import {
	createVerificationRequest,
	deleteVerificationRequest,
	sendVerificationRequest,
	updateVerificationRequest,
	verifyRequest,
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
import { verifyToken } from "../middlewares/auth";

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
	createVerificationRequest
);
router.patch(
	"/email/verification",
	mergeSignedCookiesIntoCookies,
	checkSchema(cookieJWTSchema),
	validate,
	verifyToken,
	updateVerificationRequest
);
router.delete(
	"/email/verification",
	mergeSignedCookiesIntoCookies,
	checkSchema(cookieJWTSchema),
	validate,
	verifyToken,
	deleteVerificationRequest
);

/**
 * 인증 이메일 발송 API 엔드포인트
 */
router.post(
	"/email/send-verification",
	mergeSignedCookiesIntoCookies,
	checkSchema(cookieJWTSchema),
	validate,
	verifyToken,
	sendVerificationRequest
);

/**
 * 인증 번호 검증 API 엔드포인트
 */
router.post(
	"/email/verify",
	mergeSignedCookiesIntoCookies,
	checkSchema(verifySchema),
	validate,
	verifyToken,
	verifyRequest
);

export default router;
