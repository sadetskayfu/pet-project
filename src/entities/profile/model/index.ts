import { Country } from "@/entities/countries"

export type GenderType = 'man' | 'woman'

export type Profile = {
    userId: number
    email: string
    displayName: string | null
    avatarMedium: string | null
    totalReviews: number
    country: Country
    firstName: string | null
    lastName: string | null
    birthDate: string | null
    posterSmall: string | null
    posterMedium: string | null
    posterLarge: string | null
    gender: GenderType | null
    isHiddenProfile: boolean
    isHiddenReviews: boolean
    isHiddenWatchedMovies: boolean
    isHiddenWishedMovies: boolean
    isMe: boolean
}

export type UpdateUserInfoBody = {
    displayName?: string | null
    firstName?: string | null
    lastName?: string | null
    birthDate?: string | null
    gender?: GenderType | null
}

export type UpdatePrivateSettingsBody = {
    isHiddenProfile: boolean
    isHiddenWatchedMovies: boolean
    isHiddenWishedMovies: boolean
}

export type UpdateUserInfoResponse = {
    userId: number
    displayName: string | null
    firstName: string | null
    lastName: string | null
    birthDate: string | null
    gender: GenderType | null
}

export type UpdatePrivateSettingsResponse = {
    userId: number
    isHiddenProfile: boolean
    isHiddenWatchedMovies: boolean
    isHiddenWishedMovies: boolean
}

export type MutationPosterResponse = {
    userId: number
    posterSmall: string | null
    posterMedium: string | null
    posterLarge: string | null
}

