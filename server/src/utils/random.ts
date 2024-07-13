import crypto from "node:crypto";

/**
 * 랜덤 숫자 생성
 */
const createRandomNumber = (digit: number): string => {
	const randomNumber = crypto
		.randomBytes(Math.ceil(digit / 2))
		.toString("hex")
		.slice(0, digit);

	return randomNumber;
};

export { createRandomNumber };
