import { createContext } from 'react'
import { type useAsideMenu } from './useAsideMenu'

type ContextType = ReturnType<typeof useAsideMenu> | null

export const AsideMenuContext = createContext<ContextType>(null)
