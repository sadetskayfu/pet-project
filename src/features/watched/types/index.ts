import { MovieForCard } from "@/entities/movies/model"

export type ToggleWatchedBody = {
	id: number
	title: string
	isWatched: boolean
}

export type MoviePageData = {
    data: MovieForCard[]
}