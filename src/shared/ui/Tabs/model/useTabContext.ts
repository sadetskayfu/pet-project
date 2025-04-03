import { useContext } from "react"
import { TabContext } from "./TabContext"

export const useTabContext = () => {
    const context = useContext(TabContext)

    if(!context) {
        throw new Error('Tab must be wrapped in <Tabs />')
    }

    return context
}