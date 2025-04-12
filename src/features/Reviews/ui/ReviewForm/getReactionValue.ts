export const getReactionValue = (value: number) => {
	if (value > 0 && value <= 1) return 1
	if (value > 1 && value <= 2) return 2
	if (value > 2 && value <= 3) return 3
	if (value > 3 && value <= 4) return 4
	if (value > 4 && value <= 5) return 5
	return 0
}
