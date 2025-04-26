import { actorApi } from "@/entities/actors"
import { useQuery } from "@tanstack/react-query"

export const useActors = (movieId: number) => {
    const { data, isLoading, error } = useQuery({...actorApi.getActorsForMovieQueryOptions(movieId)})

    return {actors: data, isLoading, error}
}