import {
	combineSlices,
	createAsyncThunk,
	createSelector,
	ThunkAction,
	UnknownAction,
} from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { store, extraArgument } from '@/app/providers/store'

export const rootReducer = combineSlices()

//export type AppState = ReturnType<typeof store.getState>
export type AppState = any
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<
	R,
	AppState,
	typeof extraArgument,
	UnknownAction
>

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppState
	rejectValue: string
	dispatch: AppDispatch
	extra: typeof extraArgument
}>()
