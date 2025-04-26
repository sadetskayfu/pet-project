import { AsideMenu } from "@/shared/ui/AsideMenu"
import { AsideMenuContent } from "@/shared/ui/AsideMenu/ui/AsideMenuContent"
import { useCallback, useMemo, useState } from "react"
import { links } from "../../model/links"
import { AsideMenuTrigger } from "@/shared/ui/AsideMenu/ui/AsideMenuTrigger"
import { IconButton } from "@/shared/ui/IconButton"
import { Filter, XMark } from "@/shared/assets/icons"
import { AsideMenuClose } from "@/shared/ui/AsideMenu/ui/AsideMenuClose"
import { NavigateLink } from "@/shared/ui/NavigateLink"
import styles from './style.module.scss'

const MobileAdminPanelSideBar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleClose = useCallback(() => {
		setIsOpen(false)
	}, [])

	const renderLinks = useMemo(() => {
		return links.map((link) => (
			<NavigateLink onClick={handleClose} key={link.path} to={link.path}>
				{link.label}
			</NavigateLink>
		))
	}, [handleClose])

	return (
		<AsideMenu open={isOpen} setOpen={setIsOpen} placement="left">
			<AsideMenuTrigger>
				<IconButton variant="outlined" className={styles['trigger-button']} size="m" borderRadius="m">
					<Filter />
				</IconButton>
			</AsideMenuTrigger>
			<AsideMenuContent className={styles['aside-menu']}>
				<nav
					className={styles["side-bar"]}
					aria-label="Навигационное меню панели администратора"
				>
					<ul className={styles["list"]}>{renderLinks}</ul>
					<AsideMenuClose>
						<IconButton className={styles['close-button']} variant="clear" borderRadius="m" size="m">
							<XMark />
						</IconButton>
					</AsideMenuClose>
				</nav>
			</AsideMenuContent>
		</AsideMenu>
	)
}

export default MobileAdminPanelSideBar