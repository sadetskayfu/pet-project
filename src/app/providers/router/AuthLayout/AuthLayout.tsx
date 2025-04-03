import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
	return (
		<div className="app">
			<main>
				<Suspense>
					<Outlet />
				</Suspense>
			</main>
		</div>
	)
}
