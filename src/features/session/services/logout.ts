import { userActions } from "@/entities/user"
import { addNotification } from "@/features/Notifications"
import { getErrorMessage } from "@/shared/helpers/getErrorMessage"
import { createAppAsyncThunk } from "@/shared/redux/redux"
import { sessionApi } from "../api/api"
import { queryClient } from "@/shared/api"
import { movieApi } from "@/entities/movies"
import { reviewApi } from "@/entities/reviews"
import { commentApi } from "@/entities/comments"
import { profileApi } from "@/entities/profile"

export const logout = createAppAsyncThunk(
	"session/logout",
	async (_, { dispatch }) => {
		try {
			await sessionApi.logout()

			dispatch(userActions.removeUser())

			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey] })
			queryClient.invalidateQueries({ queryKey: [reviewApi.baseKey] })
			queryClient.invalidateQueries({ queryKey: [commentApi.baseKey] })
			queryClient.invalidateQueries({ queryKey: [profileApi.baseKey] })
		} catch (error) {
			dispatch(
				addNotification({
					severity: "error",
					message: getErrorMessage(error, "Не удалось выйти из аккаунта"),
				})
			)
		}
	}
)
