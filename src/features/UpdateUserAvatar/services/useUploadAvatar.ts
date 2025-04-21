import { commentApi } from "@/entities/comments"
import { profileApi } from "@/entities/profile"
import { reviewApi } from "@/entities/reviews"
import { userApi } from "@/entities/user"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useUploadAvatar = (onSuccess: () => void ) => {
    const dispatch = useAppDispatch()

	const {mutate, error, isPending } = useMutation({
		mutationFn: userApi.uploadAvatar,

		onSuccess: (updatedUser) => {
            queryClient.setQueryData(profileApi.getUserProfileQueryOptions(updatedUser.id).queryKey, (oldData) => {
                if(oldData) {
                    return {...oldData, avatarMedium: updatedUser.avatarMedium}
                }
            })

            queryClient.invalidateQueries({queryKey: [reviewApi.baseKey]})
            queryClient.invalidateQueries({queryKey: [commentApi.baseKey]})

            dispatch(addNotification({severity: 'success', message: 'Аватар успешно изменен'}))

            onSuccess?.()
        },        
	})

    return { uploadAvatar: mutate, error, isPending }
}
