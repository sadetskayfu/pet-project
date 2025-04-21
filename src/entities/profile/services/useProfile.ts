import { useQuery } from "@tanstack/react-query"
import { profileApi } from "../api/api"

export const useProfile = (userId: number) => {
    const { data, error, isLoading } = useQuery({...profileApi.getUserProfileQueryOptions(userId)})

    return { profile: data, error, isLoading }
}