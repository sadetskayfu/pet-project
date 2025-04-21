import { commentApi } from "@/entities/comments"
import { profileApi } from "@/entities/profile"
import { reviewApi } from "@/entities/reviews"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useUpdateProfileUserInfo = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, error, isPending } = useMutation({
		mutationFn: profileApi.updateUserInfo,
		onSuccess: (updatedProfile) => {
			let hasChangedDisplayname: boolean = false

			queryClient.setQueryData(
				profileApi.getUserProfileQueryOptions(updatedProfile.userId).queryKey,
				(oldData) => {
					if (oldData) {
						if(oldData.displayName !== updatedProfile.displayName) {
							hasChangedDisplayname = true
						}
						return {
							...oldData,
                            ...updatedProfile,
						}
					}
				}
			)

			if(hasChangedDisplayname) {
				queryClient.invalidateQueries({queryKey: [reviewApi.baseKey]})
				queryClient.invalidateQueries({queryKey: [commentApi.baseKey]})
			}

			dispatch(addNotification({severity: 'success', message: 'Информация о вас успешно изменена'}))

			onSuccess?.()
		},
	})

    return { updateProfileUserInfo: mutate, error, isPending }
}
