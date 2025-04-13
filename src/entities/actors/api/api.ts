import { jsonApiInstance } from '@/shared/api'
import { Actor, ActorForMovie, ActorsResponse, CreateActorBody } from '../model/Actor'
import {
	infiniteQueryOptions,
	keepPreviousData,
	queryOptions,
} from '@tanstack/react-query'

type QueryParams = {
	limit?: number
	nextCursor?: number | null
	name?: string
}

const getQueries = (params?: QueryParams) => {
	const searchParams = new URLSearchParams()

	searchParams.set('limit', String(params?.limit || 20))

	if (params?.name) searchParams.set('name', params.name)
	if (params?.nextCursor) searchParams.set('cursor', String(params.nextCursor))

	return searchParams.toString()
}

export const actorApi = {
	baseKey: 'actor',

	createActor: (body: CreateActorBody) =>
		jsonApiInstance<Actor>('/actors', {
			method: 'POST',
			json: body,
		}),

	updateActor: (id: number, body: CreateActorBody) =>
		jsonApiInstance<Actor>(`/actors/${id}`, {
			method: 'PUT',
			json: body,
		}),

	deleteActor: (id: number) =>
		jsonApiInstance<Actor>(`/actors/${id}`, {
			method: 'DELETE',
		}),

	getActorsInfinityQueryOptions: (params: QueryParams) => {
		return infiniteQueryOptions({
			queryKey: [actorApi.baseKey, 'list', params],
			queryFn: ({ pageParam, signal }) =>
				jsonApiInstance<ActorsResponse>(
					`/actors?${getQueries({ ...params, nextCursor: pageParam })}`,
					{ signal }
				),
			initialPageParam: 0,
			getNextPageParam: (result) => result.nextCursor,
			select: (result) => result.pages.flatMap((page) => page.data),
			placeholderData: keepPreviousData,
			staleTime: Infinity,
		})
	},

	getActorsForMovieQueryOptions: (movieId: number) => {
		return queryOptions({
			queryKey: [actorApi.baseKey, movieId],
			queryFn: ({ signal }) =>
				jsonApiInstance<ActorForMovie[]>(`/actors/${movieId}`, {
					signal,
				}),
			staleTime: Infinity,
		})
	},

	// getActorsQueryOptions: (params: QueryParams) => {
	// 	return queryOptions({
	// 		queryKey: [actorApi.baseKey, 'list', params],
	// 		queryFn: ({ signal }) =>
	// 			jsonApiInstance<ActorsResponse>(`/actors?${getQueries({ ...params })}`, {
	// 				signal,
	// 			}),
	// 		staleTime: Infinity,
	// 	})
	// },
}
