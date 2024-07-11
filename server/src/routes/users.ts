import express from "express";

import { register, login } from "../controllers/user.controller";

const router = express.Router();
router.use(express.json());

/**
 * 엔드포인트 정의
 */
router.post("/register", register);
router.post("/login", login);

export default router;
