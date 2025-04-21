import { movieApi, UserMoviesQueryParams } from "@/entities/movies"
import { useQuery } from "@tanstack/react-query"

export const useWishedMovies = (
	userId: number,
	params: UserMoviesQueryParams,
) => {
	const { data, error, isLoading } = useQuery({
		...movieApi.getWishedMoviesQueryOptions(userId, params),
	})

	return { data, error, isLoading }
}
