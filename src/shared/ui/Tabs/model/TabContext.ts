import { IndicatorPosition } from "@/shared/ui/Indicator"
import { createContext } from "react"

type ContextType = {
    selectedValue: string
    onChange: (value: string) => void
    indicator: boolean
    indicatorPosition: IndicatorPosition
    fullWidth: boolean
} | null

export const TabContext = createContext<ContextType>(null)