import { ActorRole } from "@/entities/actors"
import { Country } from "@/entities/countries"
import { Genre } from "@/entities/genres"

export type MediaType = 'movie' | 'series' | 'animated_film'
export type ExtendedMediaType = MediaType | 'all'

export type MovieForCard = {
    id: number
    title: string
    countries: Country[]
    genres: Genre[]
    duration: number
    rating: number
    totalReviews: number
    releaseYear: number
    cardImgUrl: string
    isWatched: boolean
    isWished: boolean
    isRated: boolean
    ageLimit: number
    type: MediaType
}

export interface Movie extends MovieForCard {
    releaseDate: string
    description: string
    videoUrl: string
    trailerUrl: string
    posterUrl: string
}

export type Cursor = {
    id?: number
    rating?: number
    releaseYear?: number
}

export type MovieForCardsResponse = {
    data: MovieForCard[]
    nextCursor: Cursor | null
}

export type CreateMovieActorBody = {
    id: number
    role: ActorRole
}

export type CreateMovieBody = {
    title: string
    description: string
    ageLimit: number
    releaseDate: string
    countries: string[]
    duration: number
    cardImgUrl: string
    posterUrl: string
    genres: number[]
    actors: CreateMovieActorBody[]
    type: MediaType
}

export type WatchedMovieResponse = {
    id: number
    title: string
}

export type WishedMovieResponse = {
    id: number
    title: string
}

export type MovieSortValue =
	| "rating-asc"
	| "rating-desc"
	| "releaseYear-asc"
	| "releaseYear-desc"
    | 'desc'

export type PaginationMeta = {
    total: number
    page: number
    limit: number
    totalPages: number
}

export type UserMoviesResponse = {
    data: MovieForCard[]
    meta: PaginationMeta
}