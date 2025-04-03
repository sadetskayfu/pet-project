import './styles/main.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './providers/router/router'
import { useAppDispatch } from '@/shared/redux/redux'
import { useEffect } from 'react'
import { getSessionInfo } from '@/features/session'
import { Notifications } from '@/features/Notifications'

export function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getSessionInfo())
	}, [dispatch])

	return (
		<>
			<RouterProvider router={router} />
			<Notifications />
		</>
	)
}