import { Button } from '@/shared/ui/Button'
import { NavigateLink } from '@/shared/ui/NavigateLink'
import { links } from '../model/links'
import { useMemo } from 'react'
import { ROUTES } from '@/shared/constants/routes'
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'
import { useAppDispatch } from '@/shared/redux/redux'
import { authActions } from '@/features/auth'
import { useSelector } from 'react-redux'
import { userSelectors } from '@/entities/user'
import { User } from '@/shared/assets/icons'
import { IconButton } from '@/shared/ui/IconButton'
import { sessionSelectors } from '@/features/session'
import { Skeleton, Skeletons } from '@/shared/ui/Skeleton'
import styles from './style.module.scss'

export const Header = () => {
	const dispatch = useAppDispatch()

	const user = useSelector(userSelectors.getUser)
	const isLoading = useSelector(sessionSelectors.getLoading)

	const renderLinks = useMemo(
		() =>
			links.map((link) => (
				<li key={link.path} className={styles['link-item']}>
					<NavigateLink fullHeight to={link.path}>
						{link.text}
					</NavigateLink>
				</li>
			)),
		[]
	)

	return (
		<header className={styles['header']}>
			<div className="container">
				<div className={styles['inner']}>
					<ul className={styles['link-list']}>{renderLinks}</ul>
					<div className={styles['actions']}>
						{isLoading ? (
							<Skeletons count={2}>
								<Skeleton className={styles['actions__skeleton-btn']}/>
							</Skeletons>
						) : user ? (
							<IconButton borderRadius='m' size='s'>
								<User />
							</IconButton>
						) : (
							<>
								<Button
									size="s"
									color="secondary"
									variant="clear"
									to={ROUTES.AUTH}
									onClick={() => dispatch(authActions.onChangeAuthType('login-by-email'))}
								>
									Login
								</Button>
								<Button
									size="s"
									color="primary"
									to={ROUTES.AUTH}
									onClick={() => dispatch(authActions.onChangeAuthType('register-by-email'))}
								>
									Register
								</Button>
							</>
						)}
						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</header>
	)
}
