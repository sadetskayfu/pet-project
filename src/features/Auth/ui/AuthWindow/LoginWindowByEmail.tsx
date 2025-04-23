import { lazy, Suspense, useState } from "react"
import { LoginFormSkeleton } from "../AuthForm/LoginFormSkeleton"
import { Typography } from "@/shared/ui/Typography"
import { useAppDispatch } from "@/shared/redux/redux"
import { authActions, authSelectors } from "../../slice/authSlice"
import { useSelector } from "react-redux"
import { classNames, Mods } from "@/shared/helpers/classNames"
import { useDebounce } from "@/shared/hooks"
import { AuthType } from "../../model/Auth"
import { NavigateActions } from "./NavigateActions"
import styles from "./style.module.scss"

const LoginFormByEmail = lazy(() => import("../AuthForm/LoginFormByEmail"))

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

	const mods: Mods = {
		[styles["visible"]]: authType === "login-by-email",
		[styles["unmounting"]]: isUnmountingAnimation,
	}

	return (
		<div className={classNames(styles["window-container"], [], mods)}>
			<div className={styles["window"]}>
				<div className={styles["header"]}>
					<Typography component="h1" size="h4" color="primary">
						Войдите в аккаунт
					</Typography>
					<NavigateActions />
				</div>
				<Suspense fallback={<LoginFormSkeleton />}>
					<LoginFormByEmail />
				</Suspense>
				<button
					onClick={() => goToRegister("register-by-email")}
					disabled={isUnmountingAnimation}
					className={classNames("text-button", [styles["switch-auth-type-button"]])}
				>
					Создать аккаунт
				</button>
			</div>
		</div>
	)
}
