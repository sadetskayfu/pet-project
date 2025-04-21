import { jsonApiInstance } from "@/shared/api";
import { MutationAvatarResponse } from "../model/User";

export const userApi = {
    baseKey: 'user',

    uploadAvatar: (formData: FormData) => jsonApiInstance<MutationAvatarResponse>('/users/avatar', {
        method: 'POST',
        formData
    }),

    deleteAvatar: () => jsonApiInstance<MutationAvatarResponse>('/users/avatar', {
        method: 'DELETE',
    })
}