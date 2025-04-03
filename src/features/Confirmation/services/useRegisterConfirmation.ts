import { useMutation } from '@tanstack/react-query'
import { confirmationApi } from '../api/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { addNotification } from '@/features/Notifications'
import { getSessionInfo } from '@/features/session'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { queryClient } from '@/shared/api'
import { movieApi } from '@/entities/movies'

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
						severity: 'error',
					})
				)
			}

			dispatch(
				addNotification({
					severity: 'success',
					message: 'You have successfully created an account',
				})
			)

			queryClient.invalidateQueries({queryKey: [movieApi.baseKey]})

			navigate(location.state?.from || ROUTES.HOME)
		},
	})

	return { registerConfirmation: mutate, error, isPending }
}
