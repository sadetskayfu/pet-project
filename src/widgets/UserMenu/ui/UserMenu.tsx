import { Menu } from "@/shared/ui/Menu/ui/Menu/Menu"
import { MenuItem } from "@/shared/ui/Menu/ui/MenuItem/MenuItem"
import { MenuItemContent } from "@/shared/ui/Menu/ui/MenuItemContent/MenuItemContent"
import { Divider } from "@/shared/ui/Divider"
import { memo, useCallback } from "react"
import { Arrow, User } from "@/shared/assets/icons"
import { useSelector } from "react-redux"
import { userSelectors } from "@/entities/user"
import { useAppDispatch } from "@/shared/redux/redux"
import { logout } from "@/features/session"
import { ROUTES } from "@/shared/constants/routes"
import styles from "./style.module.scss"

export const UserMenu = memo(() => {
	const dispatch = useAppDispatch()
	const user = useSelector(userSelectors.getUser)

	const handleLogout = useCallback(() => {
		dispatch(logout())
	}, [dispatch])

	const isAdmin = user?.roles.find((role) => role === "admin")

	return (
		<Menu
			className={styles['menu']}
			placementRoot="bottom-end"
			trigger={
				<button className={styles["button"]}>
					<span className={styles['button__icon']}>
						<User />
					</span>
					<Arrow className={styles['button__arrow']} direction="bottom" />
				</button>
			}
		>
			<MenuItem to={`${ROUTES.PROFILE}/${user?.id}`} label="Профиль">
				<MenuItemContent title="Профиль" />
			</MenuItem>
			{isAdmin && (
				<MenuItem to={ROUTES.ADMIN_GENRES} label="Панель администрации">
					<MenuItemContent title="Панель администрации" />
				</MenuItem>
			)}
			<Divider component="li" orientation="horizontal" />
			<MenuItem onClick={handleLogout} label="Выйти">
				<MenuItemContent title="Выйти" />
			</MenuItem>
		</Menu>
	)
})
