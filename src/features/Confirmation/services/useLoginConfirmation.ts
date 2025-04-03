import { useMutation } from '@tanstack/react-query'
import { confirmationApi } from '../api/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { addNotification } from '@/features/Notifications'
import { getSessionInfo } from '@/features/session'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { queryClient } from '@/shared/api'
import { movieApi } from '@/entities/movies'

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
					message: 'You have successfully logged in to your account',
				})
			)

			queryClient.invalidateQueries({queryKey: [movieApi.baseKey]})

			const redirectTo = location.state?.from || ROUTES.HOME

			navigate(redirectTo)
		},
	})

	return { loginConfirmation: mutate, error, isPending }
}
