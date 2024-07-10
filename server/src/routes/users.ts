import express from "express";
import { checkSchema } from "express-validator";

import {
	register,
	login,
	emailAuth,
	emailAuthCheck,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { emailAuthSchema } from "../validations/user.validation";

const router = express.Router();
router.use(express.json());

/**
 * 엔드포인트 정의
 */
router.post("/register", register);
router.post("/login", login);
router.post("/email-auth", checkSchema(emailAuthSchema), validate, emailAuth);
router.post("/email-auth-check", emailAuthCheck);

export default router;
