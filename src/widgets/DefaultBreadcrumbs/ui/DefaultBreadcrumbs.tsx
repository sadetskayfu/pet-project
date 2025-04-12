import { capitalizeFirstLetter } from '@/shared/helpers/formattingString'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { CustomLink } from '@/shared/ui/CustomLink'
import { useLocation } from 'react-router-dom'
import styles from './style.module.scss'

export const DefaultBreadcrumbs = ({ className }: { className?: string }) => {
	const location = useLocation()

	const paths = location.pathname.split('/').filter((x) => x)

	return (
		<Breadcrumbs aria-label="Breadcrumbs" className={className}>
				{paths.map((path, index) => {
					const to = `/${paths.slice(0, index + 1).join('/')}`

					const isActive = location.pathname === to

					return (
						<>
							{!isActive ? (
								<CustomLink className={styles['link']} key={path} to={to} color="inherit">
									{capitalizeFirstLetter(path)}
								</CustomLink>
							) : (
								<span className={styles['active-link']}>
									{capitalizeFirstLetter(path)}
								</span>
							)}
						</>
					)
				})}
		</Breadcrumbs>
	)
}
