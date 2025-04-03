import { useEffect, useState } from "react"

export const useContainerWidth = (containerRef: React.RefObject<HTMLElement>) => {
	const [containerWidth, setContainerWidth] = useState(0)

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			setContainerWidth(entries[0].contentRect.width)
		})

        const container = containerRef.current

		if (container) {
            resizeObserver.observe(container)
        }

		return () => resizeObserver.disconnect()
	}, [containerRef])

    return { containerWidth }
}
