import { createContext } from 'react'

type MenuContextType = {
    getItemProps: (
        userProps?: React.HTMLProps<HTMLElement>
    ) => Record<string, unknown>
    activeIndex: number | null 
}

export const MenuContext = createContext<MenuContextType>({
    getItemProps: () => ({}),
    activeIndex: null,
})
