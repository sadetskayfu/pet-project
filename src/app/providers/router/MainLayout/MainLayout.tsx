import { Header } from '@/widgets/Header'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
	return (
		<div className="app">
			<Header />
			<main>
				<Suspense fallback={null}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	)
}
