import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rootReducer } from '@/shared/redux/redux'
import { AuthType } from '../model/Auth'

interface AuthSchema {
	userId: number | null
	email: string | null
	authType: AuthType
}

const initialState: AuthSchema = {
	userId: null,
	email: null,
	authType: 'register-by-email'
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	selectors: {
		getUserId: (state) => state.userId,
		getUserEmail: (state) => state.email,
		getAuthType: (state) => state.authType,
	},
	reducers: {
		onChangeAuthType: (state, action: PayloadAction<AuthType>) => {
			state.authType = action.payload
		},
		setUserId: (state, action: PayloadAction<number>) => {
			state.userId = action.payload
		},
		setUserEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		}
	},
}).injectInto(rootReducer)

export const authSelectors = authSlice.selectors
export const authActions = authSlice.actions


