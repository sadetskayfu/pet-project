import { XMark } from "@/shared/assets/icons"
import { AsideMenu } from "@/shared/ui/AsideMenu"
import { AsideMenuClose } from "@/shared/ui/AsideMenu/ui/AsideMenuClose"
import { AsideMenuContent } from "@/shared/ui/AsideMenu/ui/AsideMenuContent"
import { IconButton } from "@/shared/ui/IconButton"
import { memo, useCallback, useState } from "react"
import { AsideMenuTrigger } from "@/shared/ui/AsideMenu/ui/AsideMenuTrigger"
import { Composite, CompositeItem } from "@floating-ui/react"
import { links } from "../../model/links"
import { NavigateLink } from "@/shared/ui/NavigateLink"
import { ROUTES } from "@/shared/constants/routes"
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher"
import { Logo } from "@/widgets/Logo"
import styles from "./style.module.scss"

const MobileAsideMenu = memo(() => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleClose = useCallback(() => {
		setIsOpen(false)
	}, [])

	return (
		<AsideMenu open={isOpen} setOpen={setIsOpen}>
			<AsideMenuTrigger>
				<IconButton
					className={styles["open-button"]}
					variant="clear"
					borderRadius="m"
					size="s"
					aria-label="Открыть боковое меню навигации"
				>
					<span className={styles["open-button__burger-line"]}></span>
				</IconButton>
			</AsideMenuTrigger>
			<AsideMenuContent className={styles["aside-menu"]}>
				<Logo />
				<Composite
					render={
						<ul className={styles["link-list"]}>
							{links.map((link) => (
								<li key={link.path}>
									<CompositeItem
										render={
											<NavigateLink
												activeWhileStartWithTo={link.path === ROUTES.CATALOG}
												to={link.path}
												onClick={handleClose}
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
				<ThemeSwitcher className={styles["theme-switcher"]} />
				<AsideMenuClose>
					<IconButton
						aria-label="Закрыть боковое меню"
						borderRadius="m"
						size="s"
						variant="clear"
						className={styles["close-button"]}
					>
						<XMark />
					</IconButton>
				</AsideMenuClose>
			</AsideMenuContent>
		</AsideMenu>
	)
})

export default MobileAsideMenu
