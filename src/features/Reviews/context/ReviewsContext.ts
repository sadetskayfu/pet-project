import { MediaType } from "@/entities/movies"
import { createContext } from "react"

type ContextType = {
	hasMutationRef: React.RefObject<boolean>
	movieId: number
	movieTitle: string
	mediaType: MediaType
} | null

export const ReviewsContext = createContext<ContextType>(null)
