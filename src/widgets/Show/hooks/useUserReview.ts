import { reviewApi } from "@/entities/reviews"
import { useQuery } from "@tanstack/react-query"

export const useUserReview = (movieId: number) => {
    const { data, isLoading } = useQuery({...reviewApi.getUserReviewForMovie(movieId)})

    return { userReview: data, isLoading }
}