import { lazy, Suspense, useState } from 'react'
import { LoginFormSkeleton } from '../AuthForm/LoginFormSkeleton'
import { Typography } from '@/shared/ui/Typography'
import { Button } from '@/shared/ui/Button'
import { useAppDispatch } from '@/shared/redux/redux'
import { authActions, authSelectors } from '../../slice/authSlice'
import { useSelector } from 'react-redux'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { useDebounce } from '@/shared/hooks'
import { Divider } from '@/shared/ui/Divider'
import { Mobile } from '@/shared/assets/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip'
import { AuthType } from '../../model/Auth'
import { NavigateActions } from './NavigateActions'
import styles from './style.module.scss'

const LoginFormByEmail = lazy(() => import('../AuthForm/LoginFormByEmail'))

export const LoginWindowByEmail = () => {
	const [isUnmountingAnimation, setIsUnmountingAnimation] =
		useState<boolean>(false)

	const dispatch = useAppDispatch()
	const authType = useSelector(authSelectors.getAuthType)

	const handleChangeAuthType = useDebounce(
		(authType: AuthType) => dispatch(authActions.onChangeAuthType(authType)),
		600
	)

	const goToRegister = (authType: AuthType) => {
		handleChangeAuthType(authType)
		setIsUnmountingAnimation(true)
	}

	const goToLoginByPhone = () => {
		handleChangeAuthType('login-by-phone')
		setIsUnmountingAnimation(true)
	}

	const mods: Mods = {
		[styles['visible']]: authType === 'login-by-email',
		[styles['unmounting']]: isUnmountingAnimation,
	}

	return (
		<div className={classNames(styles['window-container'], [], mods)}>
			<div className={styles['window']}>
				<div className={styles['header']}>
					<Typography
						className={styles['title']}
						component="h2"
						size="h4"
						color="primary"
					>
						Login in your account
					</Typography>
					<Tooltip>
						<TooltipTrigger>
							<Button
								onClick={goToLoginByPhone}
								aria-label="Login by phone"
								borderPlacement="right"
								className={styles['header-button']}
								variant="clear"
								size="xs"
								disabled
							>
								<span className={styles['header-button__label']}>Login by phone</span>
								<Mobile />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<Typography component="p" color="hard" size="helper">
								Login by phone
							</Typography>
						</TooltipContent>
					</Tooltip>
				</div>
				<NavigateActions />
				<Suspense fallback={<LoginFormSkeleton />}>
					<LoginFormByEmail />
				</Suspense>
				<div className={styles['switch-auth-type-section']}>
					<Typography textAlign="center" component="p">
						If you don't have an account, create account by
					</Typography>
					<div className={styles['switch-auth-type-section__actions']}>
						<Button
							borderPlacement="left"
							variant="clear"
							size="xs"
							aria-label="Create account by email"
							onClick={() => goToRegister('register-by-email')}
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
							onClick={() => goToRegister('register-by-phone')}
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
