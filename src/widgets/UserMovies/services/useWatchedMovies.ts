import { movieApi, UserMoviesQueryParams } from "@/entities/movies"
import { useQuery } from "@tanstack/react-query"

export const useWatchedMovies = (
	userId: number,
	params: UserMoviesQueryParams,
) => {
	const { data, error, isLoading } = useQuery({
		...movieApi.getWatchedMoviesQueryOptions(userId, params),
	})

	return { data, error, isLoading }
}
