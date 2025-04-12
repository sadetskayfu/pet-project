import { MovieForCard } from "@/entities/movies/model"

export type ToggleWishedBody = {
    id: number
    title: string
    isWished: boolean
}

export type MoviePageData = {
    data: MovieForCard[]
}