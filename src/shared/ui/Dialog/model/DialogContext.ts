import { createContext } from 'react'
import { type useDialog } from './useDialog'

type ContextType = ReturnType<typeof useDialog> | null

export const DialogContext = createContext<ContextType>(null)
