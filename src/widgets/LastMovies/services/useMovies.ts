import { movieApi } from "@/entities/movies"
import { useQuery } from "@tanstack/react-query"

export const useMovies = () => {
    const { data, error, isLoading } = useQuery({...movieApi.getLastMoviesQueryOptions(15)})

    return { movies: data, error, isLoading }
}