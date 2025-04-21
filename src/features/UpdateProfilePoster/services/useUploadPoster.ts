import { profileApi } from "@/entities/profile"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useUploadPoster = (onSuccess: () => void ) => {
    const dispatch = useAppDispatch()

	const {mutate, error, isPending } = useMutation({
		mutationFn: profileApi.uploadPoster,

		onSuccess: (updatedProfile) => {
            queryClient.setQueryData(profileApi.getUserProfileQueryOptions(updatedProfile.userId).queryKey, (oldData) => {
                if(oldData) {
                    return {...oldData, ...updatedProfile}
                }
            })

            dispatch(addNotification({severity: 'success', message: 'Постер успешно изменен'}))

            onSuccess?.()
        },        
	})

    return { uploadPoster: mutate, error, isPending }
}
