import { jsonApiInstance } from "@/shared/api"
import { queryOptions } from "@tanstack/react-query"
import { MutationPosterResponse, Profile, UpdatePrivateSettingsBody, UpdatePrivateSettingsResponse, UpdateUserInfoBody, UpdateUserInfoResponse, } from "../model"

export const profileApi = {
	baseKey: "profile",

	getUserProfileQueryOptions: (userId: number) => {
        return queryOptions({
			queryKey: [profileApi.baseKey, userId],
			queryFn: ({ signal }) =>
				jsonApiInstance<Profile>(`/profile/${userId}`, { signal }),
		})
    },

	updateUserInfo: (body: UpdateUserInfoBody) =>
		jsonApiInstance<UpdateUserInfoResponse>("/profile/user-info", {
			method: "PUT",
			json: body,
	}),

	updatePrivateSettings: (body: UpdatePrivateSettingsBody) => jsonApiInstance<UpdatePrivateSettingsResponse>('/profile/private-settings', {
		method: "PUT",
		json: body
	}),

	uploadPoster: (formData: FormData) => jsonApiInstance<MutationPosterResponse>('/profile/poster', {
		method: 'POST',
		formData
	}),

	deletePoster: () => jsonApiInstance<MutationPosterResponse>('/profile/poster', {
		method: 'DELETE'
	})
}
