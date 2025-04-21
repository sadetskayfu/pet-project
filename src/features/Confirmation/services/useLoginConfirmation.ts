import { useMutation } from '@tanstack/react-query'
import { confirmationApi } from '../api/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { addNotification } from '@/features/Notifications'
import { getSessionInfo } from '@/features/session'
import { useLocation, useNavigate } from 'react-router-dom'

export const useLoginConfirmation = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch()

	const { mutate, error, isPending } = useMutation({
		mutationFn: confirmationApi.loginConfirmation,
		onSuccess: async () => {
			try {
				await dispatch(getSessionInfo()).unwrap()
			} catch (error) {
				dispatch(
					addNotification({
						message: error as string,
						severity: 'error',
					})
				)
			}

			dispatch(
				addNotification({
					severity: 'success',
					message: 'Вы успешно вошли в свой аккаунт',
				})
			)

			const redirectTo = location.state?.from

			navigate(redirectTo || -1)
		},
	})

	return { loginConfirmation: mutate, error, isPending }
}
