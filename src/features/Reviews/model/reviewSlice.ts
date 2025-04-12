import { rootReducer } from "@/shared/redux/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommentForm = {
    isOpen: boolean
    value: string
    error: string | null
}

type ReviewSliceSchema = {
    expandedReviewMessages: Record<number, boolean>
    expandedCommentMessages: Record<number, boolean>
    openComments: Record<number, boolean>
    createCommentForms: Record<number, CommentForm>
    updateCommentForms: Record<number, CommentForm>
}

const initialState: ReviewSliceSchema = {
    expandedReviewMessages: {},
    expandedCommentMessages: {},
    openComments: {},
    createCommentForms: {},
    updateCommentForms: {}
}

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    selectors: {
        getOpenComments: (state) => state.openComments,
        getExpandedReviewMessages: (state) => state.expandedReviewMessages,
        getExpandedCommentMessages: (state) => state.expandedCommentMessages,
        getCreateCommentForms: (state) => state.createCommentForms,
        getUpdateCommentForms: (state) => state.updateCommentForms,
    },
    reducers: {
        toggleComments: (state, action: PayloadAction<number>) => {
            const reviewId = action.payload

            if(state.openComments[reviewId]) {
                delete state.openComments[reviewId]
                delete state.createCommentForms[reviewId]
            } else {
                state.openComments[reviewId] = true
            }
        },
        toggleReviewMessage: (state, action: PayloadAction<number>) => {
            const reviewId = action.payload

            if(state.expandedReviewMessages[reviewId]) {
                delete state.expandedReviewMessages[reviewId]
            } else {
                state.expandedReviewMessages[reviewId] = true
            }
        },

        closeReviewMessage: (state, action: PayloadAction<number>) => {
            const reviewId = action.payload
            delete state.expandedReviewMessages[reviewId]
        },

        toggleCommentMessage: (state, action: PayloadAction<number>) => {
            const commentId = action.payload

            if(state.expandedCommentMessages[commentId]) {
                delete state.expandedCommentMessages[commentId]
            } else {
                state.expandedCommentMessages[commentId] = true
            }
        },

        closeCommentMessage: (state, action: PayloadAction<number>) => {
            const commentId = action.payload
            delete state.expandedCommentMessages[commentId]
        },

        openCreateCommentForm: (state, action: PayloadAction<number>) => {
            const reviewId = action.payload

            state.createCommentForms[reviewId] = { isOpen: true, error: null, value: '' }
        },

        closeCreateCommentForm: (state, action: PayloadAction<number>) => {
            const reviewId = action.payload

            delete state.createCommentForms[reviewId]
        },

        onChangeCreateComment: (state, action: PayloadAction<{reviewId: number, value: string}>) => {
            const { reviewId, value } = action.payload

            const clearedValue = value.trim()

            if(clearedValue.length < 1 || clearedValue.length > 1000) {
                state.createCommentForms[reviewId].error = 'Минимальная длина комментария должна быть не менее 1 символа и не более 1000'
            } else {
                state.createCommentForms[reviewId].error = null
            }

            state.createCommentForms[reviewId].value = value
        },

        openUpdateCommentForm: (state, action: PayloadAction<{commentId: number, value: string}>) => {
            const commentId = action.payload.commentId
            const value = action.payload.value

            state.updateCommentForms[commentId] = { isOpen: true, error: null, value }
        },

        closeUpdateCommentForm: (state, action: PayloadAction<number>) => {
            const commentId = action.payload

            delete state.updateCommentForms[commentId]
        },

        onChangeUpdateComment: (state, action: PayloadAction<{commentId: number, value: string}>) => {
            const { commentId, value } = action.payload

            const clearedValue = value.trim()

            if(clearedValue.length < 1 || clearedValue.length > 1000) {
                state.updateCommentForms[commentId].error = 'Минимальная длина комментария должна быть не менее 1 символа и не более 1000'
            } else {
                state.updateCommentForms[commentId].error = null
            }

            state.updateCommentForms[commentId].value = value
        },

        clearAll: (state) => {
            state.createCommentForms = {}
            state.expandedCommentMessages = {}
            state.expandedReviewMessages = {}
            state.openComments = {}
            state.updateCommentForms = {}
        }
    }
}).injectInto(rootReducer)

export const reviewActions = reviewSlice.actions
export const reviewSelectors = reviewSlice.selectors