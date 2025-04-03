export type CreateReviewBody = {
    movieId: number
    rating: number
    message: string 
}

export type UpdateReviewBody = {
    rating: number
    message: string
}

export type Review = {
    id: number
    userId: number
    movieId: number
    message: string | null
    createdAt: string
    rating: number
    totalComments: number
    totalLikes: number
    isLiked: boolean
    isChanged: boolean
}