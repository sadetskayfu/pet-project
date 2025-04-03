import { useContext } from 'react'
import { AsideMenuContext } from './AsideMenuContext'

export const useAsideMenuContext = () => {
    const context = useContext(AsideMenuContext)

    if (context == null) {
        throw new Error('AsideMenu components must be wrapped in <AsideMenu />')
    }

    return context
}
