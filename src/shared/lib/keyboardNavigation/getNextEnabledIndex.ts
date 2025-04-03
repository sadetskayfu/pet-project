export const getNextEnabledIndex = (
	elements: HTMLElement[],
	currentIndex: number,
	direction: 1 | -1,
	step: number = 1,
): number => {
	const elementCount = elements.length

	let nextIndex = currentIndex

	for (let i = 1; i <= elementCount; i++) {
		nextIndex = currentIndex + (direction * i * step)

		if(nextIndex > elementCount - 1) {
			nextIndex = 0
		}

		if(nextIndex < 0) {
			nextIndex = elementCount - 1
		}

		// nextIndex =
		// 	currentIndex === -1 && direction === -1
		// 		? elementCount - 1
		// 		: (currentIndex + ( direction * i * step ) + elementCount) % elementCount

		const isDisabled =
			elements[nextIndex].getAttribute('aria-disabled') === 'true' ||
			elements[nextIndex].getAttribute('disabled') === 'true'

		if (!isDisabled) return nextIndex
	}
	return -1
}
