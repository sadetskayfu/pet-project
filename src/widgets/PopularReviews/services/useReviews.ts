import { reviewApi } from "@/entities/reviews"
import { useQuery } from "@tanstack/react-query"

export const useReviews = (enabled: boolean) => {
    const { data, error, isLoading } = useQuery({...reviewApi.getPopularReviewsQueryOptions(30), enabled})

    return { reviews: data, error, isLoading }
}