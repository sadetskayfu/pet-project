import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query"
import { CommentsResponse, CreateCommentBody, CreateCommentResponse, Cursor, UpdateCommentBody, UpdateCommentResponse } from "../model"
import { jsonApiInstance } from "@/shared/api"

export type InfinityListQueryParams = {
    limit?: number
    nextCursor?: Cursor
}

const getInfinityListQueries = (params: InfinityListQueryParams) => {
    const {
        limit = 10,
        nextCursor,
    } = params

    const searchParams = new URLSearchParams()
    
    searchParams.set("limit", String(limit))

    if (nextCursor) searchParams.set("cursor", String(nextCursor))

    return searchParams.toString()
}


export const commentApi = {
    baseKey: 'comment',

    getCommentsForReview: (reviewId: number, params: InfinityListQueryParams) => {
        return infiniteQueryOptions({
            queryKey: [commentApi.baseKey, 'list', reviewId, params],
            queryFn: ({ pageParam, signal }) =>
				jsonApiInstance<CommentsResponse>(
					`/comments/all/${reviewId}?${getInfinityListQueries({ ...params, nextCursor: pageParam })}`,
					{ signal }
				),
			initialPageParam: 0 as Cursor,
			getNextPageParam: (result) => result.nextCursor,
			select: (result) => result.pages.flatMap((page) => page.data),
			placeholderData: keepPreviousData
        })
    },

    createComment: (body: CreateCommentBody) => jsonApiInstance<CreateCommentResponse>('/comments', {
        method: 'POST',
        json: body
    }),

    updateComment: (commentId: number, body: UpdateCommentBody) => jsonApiInstance<UpdateCommentResponse>(`/comments/${commentId}`, {
        method: 'PUT',
        json: body
    }),

    deleteComment: (commentId: number) => jsonApiInstance(`/comments/${commentId}`, {
        method: 'DELETE'
    }),

    toggleLike: (commentId: number, isLiked: boolean) =>
		jsonApiInstance(`/comments/${commentId}/like`, {
			method: "PATCH",
			json: { isLiked },
	}),

	toggleDislike: (commentId: number, isDisliked: boolean) =>
		jsonApiInstance(`/comments/${commentId}/dislike`, {
			method: "PATCH",
			json: { isDisliked },
	}),
}