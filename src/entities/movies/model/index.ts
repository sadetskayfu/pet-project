import { Actor } from "@/entities/actors"
import { Country } from "@/entities/countries"
import { Genre } from "@/entities/genres"

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
}

export interface Movie extends MovieForCard {
    releaseDate: string
    description: string
    videoUrl: string
    actors: Actor[]
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

export type CreateMovieBody = {
    title: string
    description: string
    ageLimit: number
    releaseDate: string
    countries: string[]
    duration: number
    cardImgUrl: string
    videoUrl: string
    genres: number[]
    actors: number[]
}

export type WatchedMovieResponse = {
    id: number
    title: string
}

export type WishedMovieResponse = {
    id: number
    title: string
}