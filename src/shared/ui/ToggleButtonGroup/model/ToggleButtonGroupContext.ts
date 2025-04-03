import { createContext } from "react";

type ContextType = {
    disabled: boolean | undefined
    selectedValue: string | string[]
    onChange: (value: string) => void
} | null

export const ToggleButtonGroupContext = createContext<ContextType>(null);