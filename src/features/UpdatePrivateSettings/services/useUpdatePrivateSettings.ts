import { profileApi } from "@/entities/profile"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useUpdatePrivateSettings = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, error, isPending } = useMutation({
		mutationFn: profileApi.updatePrivateSettings,
		onSuccess: (data) => {
			queryClient.setQueriesData(
				{ queryKey: profileApi.getUserProfileQueryOptions(data.userId).queryKey },
				(oldData) => {
					if (oldData) {
						return {
							...oldData,
							...data,
						}
					}
				}
			)

			dispatch(
				addNotification({
					severity: "success",
					message: "Настройки приватности успешно изменены",
				})
			)

			onSuccess?.()
		},
	})

	return { updatePrivateSettings: mutate, error, isPending }
}
