import { movieApi } from "@/entities/movies"
import { useQuery } from "@tanstack/react-query"

export const useMovie = (movieId: number) => {
	const { data, isLoading, error } = useQuery({
		...movieApi.getMovieByIdQueryOptions(movieId),
	})

	return { movie: data, isLoading, error }
}
