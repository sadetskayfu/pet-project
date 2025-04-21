import { userActions } from '@/entities/user'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { createAppAsyncThunk } from '@/shared/redux/redux'
import { sessionApi } from '../api/api'
import { queryClient } from '@/shared/api'
import { movieApi } from '@/entities/movies'
import { reviewApi } from '@/entities/reviews'
import { commentApi } from '@/entities/comments'
import { profileApi } from '@/entities/profile'

export const getSessionInfo = createAppAsyncThunk(
	'session/getSessionInfo',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const sessionInfo = await sessionApi.getSessionInfo()

			dispatch(
				userActions.addUser({
					id: sessionInfo.id,
					email: sessionInfo.email,
					roles: sessionInfo.roles.map((role) => role.name),
				})
			)

			queryClient.invalidateQueries({queryKey: [movieApi.baseKey]})
			queryClient.invalidateQueries({queryKey: [reviewApi.baseKey]})
			queryClient.invalidateQueries({queryKey: [commentApi.baseKey]})
			queryClient.invalidateQueries({queryKey: [profileApi.baseKey]})

		} catch (error) {
			return rejectWithValue(getErrorMessage(error, 'Не удалось получить сессию'))
		}
	}
)
