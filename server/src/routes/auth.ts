import express from "express";
import { checkSchema } from "express-validator";

import {
	createVerification,
	deleteVerification,
	sendVerification,
	updateVerification,
	verify,
} from "../controllers/auth.controller";
import {
	createVerificationSchema,
	deleteVerificationSchema,
	sendVerificationSchema,
	updateVerificationSchema,
	verifySchema,
} from "../validations/auth.validation";
import { validate } from "../middlewares/validate";

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
	checkSchema(createVerificationSchema),
	validate,
	createVerification
);
router.patch(
	"/email/verification",
	checkSchema(updateVerificationSchema),
	validate,
	updateVerification
);
router.delete(
	"/email/verification",
	checkSchema(deleteVerificationSchema),
	validate,
	deleteVerification
);

/**
 * 인증 이메일 발송 API 엔드포인트
 */
router.post(
	"/email/send-verification",
	checkSchema(sendVerificationSchema),
	validate,
	sendVerification
);

/**
 * 인증 번호 검증 API 엔드포인트
 */
router.post("/email/verify", checkSchema(verifySchema), validate, verify);

export default router;
