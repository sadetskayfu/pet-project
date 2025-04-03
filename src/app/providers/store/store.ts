import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/shared/redux/redux'
import { sessionApi } from '@/features/session'

export const extraArgument = {
	sessionApi,
}

export const store = configureStore({
	reducer: rootReducer,

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: { extraArgument } }),
})
