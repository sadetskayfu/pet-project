import { ReactNode, useCallback, useEffect, useState } from "react"
import { WindowWidthContext } from "./WindowWidthContext"
import { throttle } from "lodash"

export const WindowWidthProvider = ({ children }: { children: ReactNode }) => {
	const [width, setWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0
	)

	const handleResize = useCallback(() => {
		setWidth(window.innerWidth)
	}, [])

	useEffect(() => {
		if (typeof window === "undefined") return

		const throttledHandleResize = throttle(handleResize, 500, {
			leading: true,
			trailing: true,
		})

		window.addEventListener("resize", throttledHandleResize)

		handleResize()

		return () => {
			window.removeEventListener("resize", throttledHandleResize)
			throttledHandleResize.cancel()
		}
	}, [handleResize])

	return (
		<WindowWidthContext.Provider value={{ windowWidth: width }}>
			{children}
		</WindowWidthContext.Provider>
	)
}
