export type User = {
    id: number
    email: string
    roles: string[]
}

export type MutationAvatarResponse = {
    id: number
    avatarSmall: string | null
    avatarMedium: string | null
}