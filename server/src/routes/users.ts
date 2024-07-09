import express from "express";

import {
	register,
	login,
	emailAuth,
	emailAuthCheck,
} from "../controllers/user.controller";

const router = express.Router();
router.use(express.json());

/**
 * 엔드포인트 정의
 */
router.post("/register", register);
router.post("/login", login);
router.post("/email-auth", emailAuth);
router.post("/email-auth-check", emailAuthCheck);

export default router;
