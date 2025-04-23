import { lazy, Suspense, useState } from "react"
import { RegisterFormSkeleton } from "../AuthForm/RegisterFormSkeleton"
import { Typography } from "@/shared/ui/Typography"
import { useAppDispatch } from "@/shared/redux/redux"
import { authActions, authSelectors } from "../../slice/authSlice"
import { classNames, Mods } from "@/shared/helpers/classNames"
import { useSelector } from "react-redux"
import { useDebounce } from "@/shared/hooks"
import { AuthType } from "../../model/Auth"
import { NavigateActions } from "./NavigateActions"
import styles from "./style.module.scss"

const RegisterFormByEmail = lazy(
	() => import("../AuthForm/RegisterFormByEmail")
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

	const mods: Mods = {
		[styles["visible"]]: authType === "register-by-email",
		[styles["unmounting"]]: isUnmountingAnimation,
	}

	return (
		<div className={classNames(styles["window-container"], [], mods)}>
			<div className={styles["window"]}>
				<div className={styles["header"]}>
					<Typography component="h1" size="h4" color="primary">
						Создайте аккаунт
					</Typography>
					<NavigateActions />
				</div>
				<Suspense fallback={<RegisterFormSkeleton />}>
					<RegisterFormByEmail />
				</Suspense>
				<button
					onClick={() => goToLogin("login-by-email")}
					disabled={isUnmountingAnimation}
					className={classNames("text-button", [styles["switch-auth-type-button"]])}
				>
					Войти в аккаунт
				</button>
			</div>
		</div>
	)
}
