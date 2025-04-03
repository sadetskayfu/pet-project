import { infiniteQueryOptions, keepPreviousData, queryOptions } from '@tanstack/react-query'
import { CreateMovieBody, Cursor, Movie, MovieForCardsResponse, WatchedMovieResponse, WishedMovieResponse } from '../model'
import { jsonApiInstance } from '@/shared/api'

export type MovieSort = 'rating' | 'releaseYear'
export type MovieOrder = 'desc' | 'asc'

export type QueryParams = {
	title?: string
	genres?: string[]
	countries?: string[]
	year?: string
	rating?: string
	limit?: number
	sort?: MovieSort
	order?: MovieOrder
	nextCursor?: Cursor
}

const getQueries = (params: QueryParams) => {
	const {
		title,
		genres,
		countries,
		year,
		rating,
		limit = 20,
		sort,
		order = 'desc',
		nextCursor = {},
	} = params

	const searchParams = new URLSearchParams()

	searchParams.set('limit', String(limit))
	searchParams.set('order', order)

	if (title) searchParams.set('title', title)
	if (genres && genres.length > 0) searchParams.set('genres', genres.join('+'))
	if (countries && countries.length > 0)
		searchParams.set('countries', countries.join('+'))
	if (year) searchParams.set('year', year)
	if (rating) searchParams.set('rating', rating)
	if (sort) searchParams.set('sort',sort)

	if (nextCursor.id) searchParams.set('cursorId', String(nextCursor.id))
	if (nextCursor.rating) searchParams.set('cursorRating', String(nextCursor.rating))
	if (nextCursor.releaseYear)
		searchParams.set('cursorReleaseYear', String(nextCursor.releaseYear))

	return searchParams.toString()
}

export const movieApi = {
	baseKey: 'movie',

	getMoviesInfinityQueryOptions: (params: QueryParams) => {
		return infiniteQueryOptions({
			queryKey: [movieApi.baseKey, 'list', params],
			queryFn: ({ pageParam, signal }) =>
				jsonApiInstance<MovieForCardsResponse>(
					`/movies?${getQueries({ ...params, nextCursor: pageParam })}`,
					{ signal }
				),
			initialPageParam: {} as Cursor,
			getNextPageParam: (result) => result.nextCursor,
			select: (result) => result.pages.flatMap((page) => page.data),
			placeholderData: keepPreviousData,
			staleTime: Infinity
		})
	},

	getMovieByIdQueryOptions: (id: number) => {
		return queryOptions({
			queryKey: [movieApi.baseKey, id],
			queryFn: ({signal}) => jsonApiInstance<Movie>(`/movies/${id}`, { signal }),
			staleTime: Infinity,
		})
	},

	createMovie: (body: CreateMovieBody) => jsonApiInstance<Movie>('/movies', {
		method: 'POST',
		json: body
	}),

	updateMovie: (id: number, body: CreateMovieBody) => jsonApiInstance<Movie>(`/movies/${id}`, {
		method: 'PUT',
		json: body,
	}),

	deleteMovie: (id: number) => jsonApiInstance<Movie>(`/movies/${id}`, {
		method: 'DELETE'
	}),

	// addToWatched: (id: number) => jsonApiInstance<WatchedMovieResponse>(`/watched-movies/${id}`, {
	// 	method: 'POST'
	// }),

	removeFromWatched: (id: number) => jsonApiInstance<WatchedMovieResponse>(`/watched-movies/${id}`, {
		method: 'DELETE'
	}),

	toggleWatched: (id: number, isWatched: boolean) => jsonApiInstance<WatchedMovieResponse>(`/watched-movies/${id}`, {
		method: 'PATCH',
		json: { isWatched }
	}),

	removeFromWished: (id: number) => jsonApiInstance<WishedMovieResponse>(`/wished-movies/${id}`, {
		method: 'DELETE'
	}),

	toggleWished: (id: number, isWished: boolean) => jsonApiInstance<WishedMovieResponse>(`/wished-movies/${id}`, {
		method: 'PATCH',
		json: { isWished}
	}),
}
