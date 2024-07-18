import express from "express";
import { checkExact, checkSchema } from "express-validator";

import { register, login } from "../controllers/user.controller";
import {
	mergeSignedCookiesIntoCookies,
	validate,
} from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validations/user.validation";
import { authRegister, authLiveChat } from "../middlewares/auth";
import { IRequest } from "../types";

const router = express.Router();
router.use(express.json());

/**
 * 엔드포인트 정의
 */
router.post(
	"/register",
	mergeSignedCookiesIntoCookies,
	checkSchema(registerSchema),
	checkExact(),
	validate,
	authRegister,
	register
);
router.post(
	"/login",
	mergeSignedCookiesIntoCookies,
	checkSchema(loginSchema),
	checkExact(),
	validate,
	login
);
router.post(
	"/test",
	mergeSignedCookiesIntoCookies,
	authLiveChat,
	(req, res) => {
		res.status(200).json({
			accessToken: (req as IRequest).accessToken,
			refreshToken: (req as IRequest).refreshToken,
		});
	}
);

export default router;
