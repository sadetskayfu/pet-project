import { useMutation } from "@tanstack/react-query"
import { confirmationApi } from "../api/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { addNotification } from "@/features/Notifications"
import { getSessionInfo } from "@/features/session"
import { useLocation, useNavigate } from "react-router-dom"

export const useRegisterConfirmation = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useAppDispatch()

	const { mutate, error, isPending } = useMutation({
		mutationFn: confirmationApi.registerConfirmation,
		onSuccess: async () => {
			try {
				await dispatch(getSessionInfo()).unwrap()
			} catch (error) {
				dispatch(
					addNotification({
						message: error as string,
						severity: "error",
					})
				)
			}

			dispatch(
				addNotification({
					severity: "success",
					message: "Вы успешно создали аккаунт",
				})
			)

			navigate(location.state?.from || -1)
		},
	})

	return { registerConfirmation: mutate, error, isPending }
}
