import { Comment } from "@/entities/comments"
import { Review } from "@/entities/reviews/model"

export type ReviewPageData = {
    data: Review[]
}

export type ToggleReviewLikeBody = {
    reviewId: number
    reviewUserName: string
    isLiked: boolean
}

export type ToggleReviewDislikeBody = {
    reviewId: number
    reviewUserName: string
    isDisliked: boolean
}

export type CommentPageData = {
    data: Comment[]
}

export type ToggleCommentLikeBody = {
    commentId: number
    commentUserName: string
    isLiked: boolean
}

export type ToggleCommentDislikeBody = {
    commentId: number
    commentUserName: string
    isDisliked: boolean
}


