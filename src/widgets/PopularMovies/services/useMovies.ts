import { movieApi } from "@/entities/movies"
import { useQuery } from "@tanstack/react-query"

export const useMovies = (enabled: boolean) => {
    const { data, error, isLoading } = useQuery({...movieApi.getPopularMoviesQueryOptions(15), enabled})

    return { movies: data, error, isLoading }
}