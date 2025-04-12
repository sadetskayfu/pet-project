import { useContext } from "react"
import { WindowWidthContext } from "./WindowWidthContext"

export const useWindowWidth = () => {
    const context = useContext(WindowWidthContext)

    return context
}