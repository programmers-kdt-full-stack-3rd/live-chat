import express from "express";

import {
	createVerification,
	deleteVerification,
	sendVerification,
	updateVerification,
	verify,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";

const router = express.Router();
router.use(express.json());

/**
 * /auth 라우트 엔드포인트 정의
 */

/**
 * 인증 번호 DB 리소스 제어
 */
router.post("/email/verification", validate, createVerification);
router.patch("/email/verification", validate, updateVerification);
router.delete("/email/verification", validate, deleteVerification);

/**
 * 인증 이메일 발송
 */
router.post("/email/send-verification", validate, sendVerification);

/**
 * 인증 번호 검증
 */
router.post("/email/verify", validate, verify);

export default router;
