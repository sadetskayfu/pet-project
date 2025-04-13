import { Country } from "@/entities/countries"

export type ReviewUserResponse = {
    id: number
    country: Country
    displayName: string | null
    email: string
    avatarUrl: string | null
    totalReviews: number
}

type DeleteReviewUserResponse = {
    totalReviews: number
}

type MovieResponse = {
    id: number
    title: string
    rating: number
    totalReviews: number
}

export type Review = {
    id: number
    message: string
    createdAt: string
    rating: number
    totalComments: number
    totalLikes: number
    totalDislikes: number
    isChanged: boolean
    isLiked: boolean
    isDisliked: boolean
    isCommented: boolean
    userId: number
    movieId: number
    user: ReviewUserResponse
}

export type CreateReviewBody = {
    movieId: number
    rating: number
    message: string 
}

export type UpdateReviewBody = {
    rating: number
    message: string
}

export interface CreateReviewResponse extends Review {
    movie: MovieResponse
}

export type UpdateReviewResponse = {
    id: number
    isChanged: boolean
    rating: number
    message: string
    movie: MovieResponse
}

export type DeleteReviewResponse = {
    id: number
    movie: MovieResponse
    user: DeleteReviewUserResponse
}

export type Cursor = {
    id: number
    totalLikes?: number
    totalDislikes?: number
}

export type ReviewForMovieResponse = {
    data: Review[]
    nextCursor: Cursor | null
}

export type CardReview = {
    id: number
    message: string
    createdAt: string
    rating: number
    userId: number
    user: ReviewUserResponse
    movieTitle: string
}

export type ReviewFilterValue = "all" | "meLiked" | "meDisliked" | "meCommented"
export type ReviewSortValue =
	| "likes-asc"
	| "likes-desc"
	| "dislikes-asc"
	| "dislikes-desc"
	| "date-asc"
	| "date-desc"
