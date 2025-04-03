import { createContext } from "react";

type ContextType = {
    disabled: boolean | undefined
} | null

export const FormGroupContext = createContext<ContextType>(null);

