export const mergeEventHandlers = <TEvent = React.KeyboardEvent<Element>>(
	handlers: (((event: TEvent) => void) | undefined)[]
) => {
	return (event: TEvent) => {
		handlers.forEach((handler) => {
			handler?.(event)
		})
	}
}
