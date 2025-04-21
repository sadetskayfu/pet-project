import { useMemo } from 'react'
import { links } from '../../model/links'
import { NavigateLink } from '@/shared/ui/NavigateLink'
import styles from './style.module.scss'

const DesktopAdminPanelSideBar = () => {
	const renderLinks = useMemo(() => {
		return links.map((link) => (
			<NavigateLink key={link.path} to={link.path}>
				{link.label}
			</NavigateLink>
		))
	}, [])

	return (
		<nav className={styles['side-bar']} aria-label='Навигационное меню панели администратора'>
			<ul className={styles['list']}>
                {renderLinks}
            </ul>
		</nav>
	)
}

export default DesktopAdminPanelSideBar