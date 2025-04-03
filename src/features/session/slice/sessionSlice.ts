import { createSlice } from "@reduxjs/toolkit"
import { getSessionInfo } from "../services/getSessionInfo"
import { logout } from "../services/logout"
import { rootReducer } from "@/shared/redux/redux"

interface SessionSliceSchema {
    isLoading: boolean
}

const initialState: SessionSliceSchema = {
    isLoading: false,
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    selectors: {
        getLoading: (state) => state.isLoading,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        // Get session info
        .addCase(getSessionInfo.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getSessionInfo.fulfilled, (state) => {
            state.isLoading = false
        })
        .addCase(getSessionInfo.rejected, (state) => {
            state.isLoading = false
        })
        // Logout
        .addCase(logout.pending, (state) => {
            state.isLoading = true
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoading = false
        })
        .addCase(logout.rejected, (state) => {
            state.isLoading = false
        })
    }
}).injectInto(rootReducer)

export const sessionSelectors = sessionSlice.selectors