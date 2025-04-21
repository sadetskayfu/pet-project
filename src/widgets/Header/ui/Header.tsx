import { Button } from "@/shared/ui/Button"
import { NavigateLink } from "@/shared/ui/NavigateLink"
import { links } from "../model/links"
import { memo, useMemo, useRef } from "react"
import { ROUTES } from "@/shared/constants/routes"
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher"
import { useAppDispatch } from "@/shared/redux/redux"
import { authActions, ConfirmRedirectToAuthDialog } from "@/features/auth"
import { useSelector } from "react-redux"
import { userSelectors } from "@/entities/user"
import { sessionSelectors } from "@/features/session"
import { Skeleton, Skeletons } from "@/shared/ui/Skeleton"
import { Composite, CompositeItem } from "@floating-ui/react"
import { ScrollButton } from "@/shared/ui/ScrollButton"
import { Portal } from "@/shared/ui/Portal"
import { UserMenu } from "@/widgets/UserMenu"
import styles from "./style.module.scss"

export const Header = memo(() => {
	const dispatch = useAppDispatch()

	const user = useSelector(userSelectors.getUser)
	const isLoading = useSelector(sessionSelectors.getSessionLoading)

	const startFocusItemRef = useRef<HTMLElement | null>(null)

	const renderLinks = useMemo(
		() =>
			links.map((link, index) => (
				<li key={link.path}>
					<CompositeItem
						ref={index === 0 ? startFocusItemRef : undefined}
						render={<NavigateLink to={link.path}>{link.text}</NavigateLink>}
					/>
				</li>
			)),
		[]
	)

	return (
		<header className={styles["header"]}>
			<div className="container">
				<div className={styles["inner"]}>
					<Composite
						render={<ul className={styles["link-list"]}>{renderLinks}</ul>}
					/>
					<div className={styles["actions"]}>
						{isLoading ? (
							<Skeletons count={2}>
								<Skeleton className={styles["actions__skeleton-btn"]} />
							</Skeletons>
						) : user ? (
							<UserMenu />
						) : (
							<>
								<Button
									size="s"
									color="secondary"
									variant="clear"
									to={ROUTES.AUTH}
									onClick={() =>
										dispatch(authActions.onChangeAuthType("login-by-email"))
									}
								>
									Войти
								</Button>
								<Button
									size="s"
									color="primary"
									to={ROUTES.AUTH}
									onClick={() =>
										dispatch(authActions.onChangeAuthType("register-by-email"))
									}
								>
									Регистрация
								</Button>
							</>
						)}
						<ThemeSwitcher />
					</div>
				</div>
			</div>
			<Portal>
				<ScrollButton
					focusRef={startFocusItemRef}
					label="Прокрутить страницу в самый вверх"
				/>
			</Portal>
			<ConfirmRedirectToAuthDialog />
		</header>
	)
})
