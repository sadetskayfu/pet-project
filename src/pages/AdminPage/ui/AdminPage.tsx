import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import { useWindowWidth } from "@/app/providers/windowWidth"
import {
	DesktopAdminPanelSideBar,
	MobileAdminPanelSideBar,
} from "@/features/AdminPanel"
import { VIEWPORT } from "@/shared/constants/viewport"
import styles from "./styles.module.scss"

const AdminPage = () => {
	const { windowWidth } = useWindowWidth()

	return (
		<div className="page">
			<div className="container">
				<div className={styles["inner"]}>
					{windowWidth > VIEWPORT.MOBILE ? (
						<Suspense>
							<DesktopAdminPanelSideBar />
						</Suspense>
					) : (
						<Suspense fallback={null}>
							<MobileAdminPanelSideBar />
						</Suspense>
					)}
					<div className={styles["panel"]}>
						<Suspense>
							<Outlet />
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminPage
