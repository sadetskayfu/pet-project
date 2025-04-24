import { Button } from "@/shared/ui/Button"
import { NavigateLink } from "@/shared/ui/NavigateLink"
import { links } from "../model/links"
import { lazy, memo, Suspense, useRef } from "react"
import { ROUTES } from "@/shared/constants/routes"
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher"
import { useAppDispatch } from "@/shared/redux/redux"
import { authActions, ConfirmRedirectToAuthDialog } from "@/features/Auth"
import { useSelector } from "react-redux"
import { userSelectors } from "@/entities/user"
import { Composite, CompositeItem } from "@floating-ui/react"
import { ScrollButton } from "@/shared/ui/ScrollButton"
import { Portal } from "@/shared/ui/Portal"
import { UserMenu } from "@/widgets/UserMenu"
import { Logo } from "@/widgets/Logo"
import { useWindowWidth } from "@/app/providers/windowWidth"
import { VIEWPORT } from "@/shared/constants/viewport"
import styles from "./style.module.scss"

const MobileAsideMenu = lazy(() => import("./MobileAsideMenu/MobileAsideMenu"))

export const Header = memo(() => {
	const dispatch = useAppDispatch()

	const user = useSelector(userSelectors.getUser)

	const startFocusItemRef = useRef<HTMLElement | null>(null)

	const { windowWidth } = useWindowWidth()

	const isMobile = windowWidth <= VIEWPORT.MOBILE

	return (
		<>
			<header className={styles["header"]}>
				<div className="container">
					<div className={styles["inner"]}>
						{!isMobile ? (
							<>
								<Logo />
								<Composite
									render={
										<ul className={styles["link-list"]}>
											{links.map((link, index) => (
												<li key={link.path}>
													<CompositeItem
														ref={index === 0 ? startFocusItemRef : undefined}
														render={
															<NavigateLink
																activeWhileStartWithTo={link.path === ROUTES.CATALOG}
																to={link.path}
															>
																{link.text}
															</NavigateLink>
														}
													/>
												</li>
											))}
										</ul>
									}
								/>
							</>
						) : (
							<Suspense fallback={null}>
								<MobileAsideMenu />
							</Suspense>
						)}
						<div className={styles["actions"]}>
							{user ? (
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
							{!isMobile && <ThemeSwitcher />}
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
		</>
	)
})
