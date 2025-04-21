import { Country } from "@/entities/countries"

export type CreateCommentBody = {
    reviewId: number
    message: string
}

export type UpdateCommentBody = {
    message: string
}

export type CommentUserResponse = {
    id: number
    country: Country
    displayName: string | null
    email: string
    avatarSmall: string | null
    totalReviews: number
}

type ReviewResponse = {
    id: number
    totalComments: number
}

export type Comment = {
    id: number
    message: string
    createdAt: string
    userId: number
    reviewId: number
    totalLikes: number
    totalDislikes: number
    isChanged: boolean
    isLiked: boolean
    isDisliked: boolean
    user: CommentUserResponse
}

export type Cursor = number

export type CommentsResponse = {
    data: Comment[]
    nextCursor: Cursor | null
}

export interface CreateCommentResponse extends Comment {
    review: ReviewResponse
}

export type UpdateCommentResponse = {
    id: number
    isChanged: boolean
    message: string
}