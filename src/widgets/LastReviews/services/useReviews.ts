import { reviewApi } from "@/entities/reviews"
import { useQuery } from "@tanstack/react-query"


export const useReviews = () => {
    const { data, error, isLoading } = useQuery({...reviewApi.getLastReviewsQueryOptions(30)})

    return { reviews: data, error, isLoading }
}