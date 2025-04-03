import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { authActions } from '../slice/authSlice'

export const useLoginByEmail = (onOpenConfirmDialog: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending, error } = useMutation({
		mutationFn: authApi.loginByEmail,
		onSuccess: (data) => {
			dispatch(authActions.setUserId(data.userId))
			dispatch(authActions.setUserEmail(data.email))
			onOpenConfirmDialog()
		},
	})

	return { login: mutate, isPending, error }
}
