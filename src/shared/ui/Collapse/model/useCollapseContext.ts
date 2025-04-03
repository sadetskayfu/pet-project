import { useContext } from "react"
import { CollapseContext } from "./CollapseContext"


export const useCollapseContent = () => {
    const context = useContext(CollapseContext)

    if(!context) {
        throw new Error('Collapse components must be wrapped in <Collapse />')
    }

    return context
}