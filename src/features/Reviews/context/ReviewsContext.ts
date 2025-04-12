import { createContext } from "react"

type ContextType = {
	hasMutationRef: React.RefObject<boolean>
	movieId: number
	movieTitle: string
} | null

export const ReviewsContext = createContext<ContextType>(null)
