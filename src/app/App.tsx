import "./styles/main.scss"
import "swiper/css"
import { RouterProvider } from "react-router-dom"
import { router } from "./providers/router/router"
import { useAppDispatch } from "@/shared/redux/redux"
import { getSessionInfo, sessionSelectors } from "@/features/session"
import { Notifications } from "@/features/Notifications"
import { useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"

export function App() {
	const dispatch = useAppDispatch()
	const isSessionLoading = useSelector(sessionSelectors.getSessionLoading)
	const [isSessionChecked, setIsSessionChecked] = useState(false)

	useLayoutEffect(() => {
		async function checkSession() {
			try {
				await dispatch(getSessionInfo()).unwrap()
			// eslint-disable-next-line
			} catch (_) {
				
			} finally {
				setIsSessionChecked(true)
			}
		}
		checkSession()
	}, [dispatch])

	if (isSessionLoading || !isSessionChecked) {
		return null
	}

	return (
		<>
			<RouterProvider router={router} />
			<Notifications />
		</>
	)
}
