import { useContext } from "react"
import { ReviewsContext } from "./ReviewsContext"

export const useReviewsContext = () => {
    const context = useContext(ReviewsContext)

    if(!context) {
        throw new Error('No reviews context')
    }

    return context
}