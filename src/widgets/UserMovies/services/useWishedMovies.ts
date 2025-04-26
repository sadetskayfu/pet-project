import { movieApi, UserMoviesQueryParams } from "@/entities/movies"
import { useQuery } from "@tanstack/react-query"

export const useWishedMovies = (
	userId: number,
	params: UserMoviesQueryParams,
	enabled: boolean
) => {
	const { data, error, isLoading, isRefetching } = useQuery({
		...movieApi.getWishedMoviesQueryOptions(userId, params),
		enabled
	})

	return { data, error, isLoading, isRefetching }
}
