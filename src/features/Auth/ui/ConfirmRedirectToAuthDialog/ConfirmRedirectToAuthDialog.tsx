import { Button } from "@/shared/ui/Button"
import { Dialog, DialogClose, DialogContent, DialogHeading } from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { IconButton } from "@/shared/ui/IconButton"
import { Arrow, XMark } from "@/shared/assets/icons"
import { useSelector } from "react-redux"
import { authActions, authSelectors } from "../../slice/authSlice"
import { useLocation } from "react-router-dom"
import { ROUTES } from "@/shared/constants/routes"
import { useAppDispatch } from "@/shared/redux/redux"
import { useCallback, useRef } from "react"
import styles from "./style.module.scss"

export const ConfirmRedirectToAuthDialog = () => {
	const location = useLocation()
	const dispatch = useAppDispatch()

	const isOpen = useSelector(authSelectors.getIsOpenConfirmRedirectDialog)

	const closeButtonRef = useRef<HTMLButtonElement>(null)

	const goToLogin = useCallback(() => {
		dispatch(authActions.onChangeAuthType("login-by-email"))
		dispatch(authActions.setOpenConfirmRedirectDialog(false))
	}, [dispatch])

	const goToRegister = useCallback(() => {
		dispatch(authActions.onChangeAuthType("register-by-email"))
		dispatch(authActions.setOpenConfirmRedirectDialog(false))
	}, [dispatch])

	const setOpen = useCallback(
		(isOpen: boolean) => {
			dispatch(authActions.setOpenConfirmRedirectDialog(isOpen))
		},
		[dispatch]
	)

	return (
		<Dialog initialFocus={closeButtonRef} open={isOpen} setOpen={setOpen}>
			<DialogContent containerClassName={styles["confirm-redirect-dialog"]} className={styles["confirm-redirect-dialog__content"]}>
				<DialogHeading>
				<Typography className={styles['confirm-redirect-dialog__header']} textAlign="center" color="hard" size="h5">
					Чтобы сделать это действие, вы должны войти в свой аккаунт
				</Typography>
				</DialogHeading>
				<div className={styles["confirm-redirect-dialog__actions"]}>
					<Button
						onClick={goToLogin}
						state={{ from: `${location.pathname}${location.search}` }}
						to={ROUTES.AUTH}
						color="primary"
						variant="outlined"
					>
						Войти в аккаунт
						<Arrow direction="right" />
					</Button>
					<Button
						onClick={goToRegister}
						state={{ from: `${location.pathname}${location.search}` }}
						to={ROUTES.AUTH}
						color="primary"
						variant="outlined"
					>
						Создать аккаунт
						<Arrow direction="right" />
					</Button>
				</div>
				<DialogClose>
					<IconButton
						ref={closeButtonRef}
						aria-label="Close dialog"
						className={styles["confirm-redirect-dialog__close-button"]}
						size="xs"
						borderRadius="s"
						variant="clear"
					>
						<XMark />
					</IconButton>
				</DialogClose>
			</DialogContent>
		</Dialog>
	)
}
