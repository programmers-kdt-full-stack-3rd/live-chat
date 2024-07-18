const generateExp = (sec: number): number =>
	Math.floor(Date.now() / 1000) + sec;

export { generateExp };
