import { AsideMenuContext } from '../model/AsideMenuContext'
import { UseAsideMenuProps, useAsideMenu } from '../model/useAsideMenu'
import { ReactNode } from 'react'

interface AsideMenuProps extends UseAsideMenuProps {
	children: ReactNode
}

export const AsideMenu = (props: AsideMenuProps) => {
	const { children, ...useAsideMenuProps } = props

	const asideMenu = useAsideMenu(useAsideMenuProps)

	return (
		<AsideMenuContext.Provider value={asideMenu}>
			{children}
		</AsideMenuContext.Provider>
	)
}
