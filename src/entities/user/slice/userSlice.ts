import { rootReducer } from "@/shared/redux/redux"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../model/User"

interface UserSliceSchema {
    user: User | null
}

const initialState: UserSliceSchema = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    selectors: {
        getUser: (state) => state.user,
    },
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = null
        }
    }
}).injectInto(rootReducer)

export const userActions = userSlice.actions
export const userSelectors = userSlice.selectors

