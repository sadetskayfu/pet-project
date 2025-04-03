import { useSelector } from 'react-redux'
import { Alert } from '@/shared/ui/Alert'
import { useAppDispatch } from '@/shared/redux/redux'
import {
	notificationActions,
	notificationSelectors,
} from '../slice/notificationSlice'
import { memo } from 'react'
import { IconButton } from '@/shared/ui/IconButton'
import { XMark } from '@/shared/assets/icons'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Portal } from '@/shared/ui/Portal'
import { Snackbar } from '@/shared/ui/Snackbar'
import { Typography } from '@/shared/ui/Typography'
import { getIcon } from '../helpers/getIcon'
import { classNames, Mods } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export const Notifications = memo(() => {
	const notifications = useSelector(notificationSelectors.getNotifications)

	const dispatch = useAppDispatch()

	const handleRemove = (id: string) => {
		dispatch(notificationActions.removeNotification(id))
	}

	const mods: Mods = {
		[styles['active']]: notifications.length > 0
	}

	return (
		<Portal>
			<TransitionGroup className={classNames(styles['notifications-group'], [], mods)}>
				{notifications.map((notification) => {
					return (
						<CSSTransition
							key={notification.id}
							timeout={300}
							unmountOnExit
							onExiting={(node: HTMLElement) => {
								node.style.height = '0px'
								node.style.marginTop = '0px'
							}}
							onEntering={(node: HTMLElement) => {
								node.style.height = node.scrollHeight + 'px'
								node.style.marginTop = '15px'
							}}
							classNames={{
								enter: styles['enter'],
								enterDone: styles['enter-done'],
								exit: styles['exit'],
							}}
						>
							<Snackbar
								className={styles['snackbar']}
								autoHideDuration={notification.timeToClose}
								borderRadius='m'
								onClose={
									notification.timeToClose
										? () => handleRemove(notification.id)
										: undefined
								}
							>
								<Alert
									className={styles['snackbar-content']}
									severity={notification.severity}
									icon={getIcon(notification.severity)}
									borderRadius='m'
									actions={
										<IconButton
											aria-label="Close notification"
											variant="clear"
											color="inherit"
											size="xxs"
											onClick={() => handleRemove(notification.id)}
										>
											<XMark />
										</IconButton>
									}
								>
									<div className={styles['alert-body']}>
										{notification.title && (
											<Typography color="inherit" size="default" fontWeight="bold">
												{notification.title}
											</Typography>
										)}
										<Typography color="inherit" size="default">
											{notification.message}
										</Typography>
									</div>
								</Alert>
							</Snackbar>
						</CSSTransition>
					)
				})}
			</TransitionGroup>
		</Portal>
	)
})
