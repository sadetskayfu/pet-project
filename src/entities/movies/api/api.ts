import {
	infiniteQueryOptions,
	keepPreviousData,
	queryOptions,
} from "@tanstack/react-query"
import {
	CreateMovieBody,
	Cursor,
	MediaType,
	Movie,
	MovieForCard,
	MovieForCardsResponse,
	MovieSortValue,
	UserMoviesResponse,
	WatchedMovieResponse,
	WishedMovieResponse,
} from "../model"
import { jsonApiInstance } from "@/shared/api"

export type InfinityListQueryParams = {
	title?: string
	genres?: string[]
	countries?: string[]
	year?: string
	rating?: string
	limit?: number
	mediaType?: MediaType
	sort?: MovieSortValue
	nextCursor?: Cursor
}

export type UserMoviesQueryParams = {
	title?: string
	limit?: number
	page: number
}

const getUserMoviesQueries = (params: UserMoviesQueryParams) => {
	const { title, limit = 20, page } = params

	const searchParams = new URLSearchParams()

	if (title) searchParams.set("title", title)

	searchParams.set("limit", String(limit))
	searchParams.set("page", String(page))

	return searchParams.toString()
}

const getInfinityListQueries = (params: InfinityListQueryParams) => {
	const {
		title,
		genres,
		countries,
		year,
		rating,
		limit = 20,
		mediaType,
		sort = "desc",
		nextCursor = {},
	} = params

	const searchParams = new URLSearchParams()

	if (sort === "desc") {
		searchParams.set("order", sort)
	} else {
		const sortArray = sort.split("-")
		const sortValue = sortArray[0]
		const orderValue = sortArray[1]

		searchParams.set("order", orderValue)
		searchParams.set("sort", sortValue)
	}

	searchParams.set("limit", String(limit))

	if (mediaType) {
		searchParams.set("type", mediaType)
	}

	if (title) searchParams.set("title", title)
	if (genres && genres.length > 0) searchParams.set("genres", genres.join("+"))
	if (countries && countries.length > 0)
		searchParams.set("countries", countries.join("+"))
	if (year) searchParams.set("year", year)
	if (rating) searchParams.set("rating", rating)

	if (nextCursor.id) searchParams.set("cursorId", String(nextCursor.id))
	if (nextCursor.rating)
		searchParams.set("cursorRating", String(nextCursor.rating))
	if (nextCursor.releaseYear)
		searchParams.set("cursorReleaseYear", String(nextCursor.releaseYear))

	return searchParams.toString()
}

export const movieApi = {
	baseKey: "movie",
	watched: "watched",
	wished: "wished",

	getMoviesInfinityQueryOptions: (params: InfinityListQueryParams) => {
		return infiniteQueryOptions({
			queryKey: [movieApi.baseKey, "list", params],
			queryFn: ({ pageParam, signal }) =>
				jsonApiInstance<MovieForCardsResponse>(
					`/movies?${getInfinityListQueries({ ...params, nextCursor: pageParam })}`,
					{ signal }
				),
			initialPageParam: {} as Cursor,
			getNextPageParam: (result) => result.nextCursor,
			select: (result) => result.pages.flatMap((page) => page.data),
			placeholderData: keepPreviousData,
			staleTime: Infinity,
		})
	},

	getMovieByIdQueryOptions: (id: number) => {
		return queryOptions({
			queryKey: [movieApi.baseKey, id],
			queryFn: ({ signal }) => jsonApiInstance<Movie>(`/movies/${id}`, { signal }),
			staleTime: Infinity,
		})
	},

	getHeightRatedMoviesQueryOptions: (limit: number = 30) => {
		return queryOptions({
			queryKey: [movieApi.baseKey, "height-rated"],
			queryFn: ({ signal }) =>
				jsonApiInstance<MovieForCard[]>(`/movies/hight-rated?limit=${limit}`, {
					signal,
				}),
		})
	},

	getLastMoviesQueryOptions: (limit: number = 30) => {
		return queryOptions({
			queryKey: [movieApi.baseKey, "last"],
			queryFn: ({ signal }) =>
				jsonApiInstance<MovieForCard[]>(`/movies/last?limit=${limit}`, { signal }),
		})
	},

	getPopularMoviesQueryOptions: (limit: number = 30) => {
		return queryOptions({
			queryKey: [movieApi.baseKey, "popular"],
			queryFn: ({ signal }) =>
				jsonApiInstance<MovieForCard[]>(`/movies/popular?limit=${limit}`, {
					signal,
				}),
		})
	},

	createMovie: (body: CreateMovieBody) =>
		jsonApiInstance<Movie>("/movies", {
			method: "POST",
			json: body,
		}),

	updateMovie: (id: number, body: CreateMovieBody) =>
		jsonApiInstance<Movie>(`/movies/${id}`, {
			method: "PUT",
			json: body,
		}),

	deleteMovie: (id: number) =>
		jsonApiInstance<Movie>(`/movies/${id}`, {
			method: "DELETE",
		}),

	removeFromWatched: (id: number) =>
		jsonApiInstance<WatchedMovieResponse>(`/watched-movies/${id}`, {
			method: "DELETE",
		}),

	toggleWatched: (id: number, isWatched: boolean) =>
		jsonApiInstance<WatchedMovieResponse>(`/watched-movies/${id}`, {
			method: "PATCH",
			json: { isWatched },
		}),

	removeFromWished: (id: number) =>
		jsonApiInstance<WishedMovieResponse>(`/wished-movies/${id}`, {
			method: "DELETE",
		}),

	toggleWished: (id: number, isWished: boolean) =>
		jsonApiInstance<WishedMovieResponse>(`/wished-movies/${id}`, {
			method: "PATCH",
			json: { isWished },
		}),

	getWatchedMoviesQueryOptions: (
		userId: number,
		params: UserMoviesQueryParams
	) => {
		return queryOptions({
			queryKey: [movieApi.baseKey, movieApi.watched, userId, params],
			queryFn: ({ signal }) =>
				jsonApiInstance<UserMoviesResponse>(
					`/movies/watched/${userId}?${getUserMoviesQueries(params)}`,
					{ signal }
				),
			placeholderData: keepPreviousData
		})
	},

	getWishedMoviesQueryOptions: (
		userId: number,
		params: UserMoviesQueryParams
	) => {
		return queryOptions({
			queryKey: [movieApi.baseKey, movieApi.wished, userId, params],
			queryFn: ({ signal }) =>
				jsonApiInstance<UserMoviesResponse>(
					`/movies/wished/${userId}?${getUserMoviesQueries(params)}`,
					{ signal }
				),
			placeholderData: keepPreviousData
		})
	},
}
