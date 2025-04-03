import { userActions } from '@/entities/user'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { createAppAsyncThunk } from '@/shared/redux/redux'

export const getSessionInfo = createAppAsyncThunk(
	'session/getSessionInfo',
	async (_, { extra, rejectWithValue, dispatch }) => {
		try {
			const sessionInfo = await extra.sessionApi.getSessionInfo()
			dispatch(
				userActions.addUser({
					id: sessionInfo.id,
					email: sessionInfo.email,
					roles: sessionInfo.roles,
				})
			)
		} catch (error) {
			return rejectWithValue(getErrorMessage(error, 'Error while getting session'))
		}
	}
)
