import { userActions } from '@/entities/user'
import { addNotification } from '@/features/Notifications'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { createAppAsyncThunk } from '@/shared/redux/redux'

export const logout = createAppAsyncThunk(
	'session/logout',
	async (_, { extra, dispatch }) => {
		try {
			await extra.sessionApi.logout()
			dispatch(userActions.removeUser())
		} catch (error) {
			dispatch(
				addNotification({
					severity: 'error',
					message: getErrorMessage(error, 'Error while logout'),
				})
			)
		}
	}
)
