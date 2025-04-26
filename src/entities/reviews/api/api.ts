import { jsonApiInstance } from "@/shared/api"
import {
	CardReview,
	CreateReviewBody,
	CreateReviewResponse,
	Cursor,
	DeleteReviewResponse,
	Review,
	ReviewFilterValue,
	ReviewForMovieResponse,
	ReviewSortValue,
	UpdateReviewBody,
	UpdateReviewResponse,
} from "../model"
import {
	infiniteQueryOptions,
	queryOptions,
} from "@tanstack/react-query"

export type InfinityListQueryParams = {
	limit?: number
	sort?: ReviewSortValue
	filters?: ReviewFilterValue[]
	nextCursor?: Cursor
}

const getInfinityListQueries = (params: InfinityListQueryParams = {}) => {
	const { limit = 10, sort = "date-asc", filters = [], nextCursor } = params

	const searchParams = new URLSearchParams()

	const sortArray = sort.split("-")
	const sortValue = sortArray[0]
	const orderValue = sortArray[1]

	if (sortValue !== "date") searchParams.set("sort", sortValue)

	searchParams.set("limit", String(limit))
	searchParams.set("order", orderValue)

	filters.forEach((filterValue) => {
		if (filterValue !== "all") {
			searchParams.set(filterValue, "true")
		}
	})

	if (nextCursor?.id) searchParams.set("cursorId", String(nextCursor.id))
	if (nextCursor?.totalLikes)
		searchParams.set("cursorTotalLikes", String(nextCursor.totalLikes))
	if (nextCursor?.totalDislikes)
		searchParams.set("cursorTotalDislikes", String(nextCursor.totalDislikes))

	return searchParams.toString()
}

export const reviewApi = {
	baseKey: "review",
	popularKey: "popular",
	lastKey: 'last',

	createReview: (body: CreateReviewBody) =>
		jsonApiInstance<CreateReviewResponse>("/reviews", {
			method: "POST",
			json: body,
		}),

	updateReview: (reviewId: number, body: UpdateReviewBody) =>
		jsonApiInstance<UpdateReviewResponse>(`/reviews/${reviewId}`, {
			method: "PUT",
			json: body,
		}),

	deleteReview: (reviewId: number) =>
		jsonApiInstance<DeleteReviewResponse>(`/reviews/${reviewId}`, {
			method: "DELETE"
		}),

	toggleLike: (reviewId: number, isLiked: boolean) =>
		jsonApiInstance(`/reviews/${reviewId}/like`, {
			method: "PATCH",
			json: { isLiked },
		}),

	toggleDislike: (reviewId: number, isDisliked: boolean) =>
		jsonApiInstance(`/reviews/${reviewId}/dislike`, {
			method: "PATCH",
			json: { isDisliked },
		}),

	getLastReviewsQueryOptions: (limit: number = 30) => {
		return queryOptions({
			queryKey: [reviewApi.baseKey, reviewApi.lastKey],
			queryFn: ({ signal }) =>
				jsonApiInstance<CardReview[]>(`/reviews/last?limit=${limit}`, { signal }),
		})
	},

	getPopularReviewsQueryOptions: (limit: number = 30) => {
		return queryOptions({
			queryKey: [reviewApi.baseKey, reviewApi.popularKey],
			queryFn: ({ signal }) =>
				jsonApiInstance<CardReview[]>(`/reviews/popular?limit=${limit}`, {
					signal,
				}),
		})
	},

	getLastReviewsForMovieQueryOptions: (movieId: number, limit: number = 10) => {
		return queryOptions({
			queryKey: [reviewApi.baseKey, reviewApi.lastKey, movieId],
			queryFn: ({ signal }) =>
				jsonApiInstance<CardReview[]>(
					`/reviews/${movieId}/last?limit=${limit}`,
					{ signal }
				),
		})
	},

	getPopularReviewsForMovieQueryOptions: (
		movieId: number,
		limit: number = 10
	) => {
		return queryOptions({
			queryKey: [reviewApi.baseKey, reviewApi.popularKey, movieId],
			queryFn: ({ signal }) =>
				jsonApiInstance<CardReview[]>(
					`/reviews/${movieId}/popular?limit=${limit}`,
					{ signal }
				),
		})
	},

	getUserReviewForMovie: (movieId: number) => {
		return queryOptions({
			queryKey: [reviewApi.baseKey, "user-review", movieId],
			queryFn: ({ signal }) =>
				jsonApiInstance<Review | null>(`/reviews/${movieId}/user-review`, {
					signal,
				}),
			staleTime: Infinity,
		})
	},

	getReviewsForMovieInfinityQueryOptions: (
		movieId: number,
		params: InfinityListQueryParams
	) => {
		return infiniteQueryOptions({
			queryKey: [reviewApi.baseKey, "list", movieId, params],
			queryFn: ({ pageParam, signal }) =>
				jsonApiInstance<ReviewForMovieResponse>(
					`/reviews/all/${movieId}?${getInfinityListQueries({ ...params, nextCursor: pageParam })}`,
					{ signal }
				),
			initialPageParam: {} as Cursor,
			getNextPageParam: (result) => result.nextCursor,
			select: (result) => result.pages.flatMap((page) => page.data),
			//placeholderData: keepPreviousData,
		})
	},
}
