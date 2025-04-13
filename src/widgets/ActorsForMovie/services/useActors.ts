import { actorApi } from "@/entities/actors"
import { useQuery } from "@tanstack/react-query"

export const useActors = (movieId: number, enabled: boolean) => {
    const { data, isLoading, error } = useQuery({...actorApi.getActorsForMovieQueryOptions(movieId), enabled})

    return {actors: data, isLoading, error}
}