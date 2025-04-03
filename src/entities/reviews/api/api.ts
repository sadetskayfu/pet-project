import { jsonApiInstance } from "@/shared/api";
import { CreateReviewBody, Review, UpdateReviewBody } from "../model/Review";

export const reviewApi = {
    baseKey: 'review',

    createReview: (body: CreateReviewBody) => jsonApiInstance<Review>('/reviews', {
        method: 'POST',
        json: body,
    }),

    updateReview: (id: number, body: UpdateReviewBody) => jsonApiInstance<Review>(`/reviews/${id}`, {
        method: 'PUT',
        json: body
    }),

    deleteReview: (id: number) => jsonApiInstance<Review>(`/reviews/${id}`)
}