import { movieApi } from "@/entities/movies"
import { useQuery } from "@tanstack/react-query"

export const useMovies = (enabled: boolean) => {
    const { data, error, isLoading } = useQuery({...movieApi.getHeightRatedMoviesQueryOptions(30), enabled})

    return { movies: data, error, isLoading }
}