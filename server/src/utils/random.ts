/**
 * 랜덤 4자리 숫자 생성
 */
const generateRandomNumber = (digits: number): string => {
	let randomList = [];

	for (let i = 0; i < digits; i++) {
		const digit = Math.floor(Math.random() * 10);
		randomList.push(digit);
	}

	return randomList.join(" ");
};

export { generateRandomNumber };
