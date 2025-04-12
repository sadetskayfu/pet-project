import { createContext } from "react"

type ContextType = {
	windowWidth: number
}

export const WindowWidthContext = createContext<ContextType>({ windowWidth: 0 })
