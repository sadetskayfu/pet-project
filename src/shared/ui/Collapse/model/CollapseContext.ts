import { createContext } from "react"

export type ContextType = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    bodyId: string
    bodyRef: React.RefObject<HTMLDivElement>
    labelId: string
    lazy: boolean
    unmount: boolean
    disabledClick: boolean
} | null

export const CollapseContext = createContext<ContextType>(null)