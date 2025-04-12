import { lazy, Suspense, useState } from 'react'
import { RegisterFormSkeleton } from '../AuthForm/RegisterFormSkeleton'
import { Typography } from '@/shared/ui/Typography'
import { Button } from '@/shared/ui/Button'
import { useAppDispatch } from '@/shared/redux/redux'
import { authActions, authSelectors } from '../../slice/authSlice'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { useSelector } from 'react-redux'
import { useDebounce } from '@/shared/hooks'
import { AuthType } from '../../model/Auth'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip'
import { Mobile } from '@/shared/assets/icons'
import { Divider } from '@/shared/ui/Divider'
import { NavigateActions } from './NavigateActions'
import styles from './style.module.scss'

const RegisterFormByEmail = lazy(
	() => import('../AuthForm/RegisterFormByEmail')
)

export const RegisterWindowByEmail = () => {
	const [isUnmountingAnimation, setIsUnmountingAnimation] =
		useState<boolean>(false)

	const dispatch = useAppDispatch()
	const authType = useSelector(authSelectors.getAuthType)

	const handleChangeAuthType = useDebounce(
		(authType: AuthType) => dispatch(authActions.onChangeAuthType(authType)),
		600
	)

	const goToLogin = (authType: AuthType) => {
		handleChangeAuthType(authType)
		setIsUnmountingAnimation(true)
	}

	const goToRegisterByPhone = () => {
		handleChangeAuthType('register-by-phone')
		setIsUnmountingAnimation(true)
	}

	const mods: Mods = {
		[styles['visible']]: authType === 'register-by-email',
		[styles['unmounting']]: isUnmountingAnimation,
	}

	return (
		<div className={classNames(styles['window-container'], [], mods)}>
			<div className={styles['window']}>
				<div className={styles['header']}>
					<Typography
						className={styles['title']}
						component="h1"
						size="h4"
						color="primary"
					>
						Create account
					</Typography>
					<Tooltip>
						<TooltipTrigger>
							<Button
								onClick={goToRegisterByPhone}
								aria-label="Create account by phone"
								borderPlacement="right"
								className={styles['header-button']}
								variant="clear"
								size="xs"
								disabled
							>
								<span className={styles['header-button__label']}>
									Create account by phone
								</span>
								<Mobile />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<Typography component="p" color="hard" size="helper">
								Create account by phone
							</Typography>
						</TooltipContent>
					</Tooltip>
				</div>
				<NavigateActions />
				<Suspense fallback={<RegisterFormSkeleton />}>
					<RegisterFormByEmail />
				</Suspense>
				<div className={styles['switch-auth-type-section']}>
					<Typography component="p">
						If you already have an account, log in by
					</Typography>
					<div className={styles['switch-auth-type-section__actions']}>
						<Button
							borderPlacement="left"
							variant="clear"
							size="xs"
							aria-label="Create account by email"
							onClick={() => goToLogin('login-by-email')}
							disabled={isUnmountingAnimation}
						>
							email
						</Button>
						<Divider style={{ marginInline: '0px' }} component="hr" />
						<Button
							borderPlacement="right"
							variant="clear"
							size="xs"
							aria-label="Create account by phone"
							onClick={() => goToLogin('login-by-phone')}
							disabled
						>
							phone
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
