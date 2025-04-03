import { ListItemContent, ListItemLink } from '@/shared/ui/Listitem'
import { useMemo } from 'react'
import { links } from './model/links'
import styles from './style.module.scss'

export const AdminPanelSideBar = () => {
	const renderLinks = useMemo(() => {
		return links.map((link) => (
			<ListItemLink key={link.path} to={link.path}>
				<ListItemContent title={link.label} />
			</ListItemLink>
		))
	}, [])

	return (
		<nav className={styles['side-bar']} aria-label='Admin panel navigate menu'>
			<ul className={styles['list']}>
                {renderLinks}
            </ul>
		</nav>
	)
}
