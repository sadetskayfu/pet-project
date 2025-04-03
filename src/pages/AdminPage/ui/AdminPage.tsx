import { AdminPanelSideBar } from '@/features/adminPanel'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import styles from './styles.module.scss'

const AdminPage = () => {
	return (
		<div className="page">
			<div className="container">
				<div className={styles['inner']}>
					<AdminPanelSideBar />
					<div className={styles['panel']}>
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
