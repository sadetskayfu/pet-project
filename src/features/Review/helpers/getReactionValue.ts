export const getReactionValue = (value: number) => {
	if (value > 0 && value <= 2) return 1
	if (value > 2 && value <= 4) return 2
	if (value > 4 && value <= 6) return 3
	if (value > 6 && value <= 8) return 4
	if (value > 8 && value <= 10) return 5
	return 0
}
