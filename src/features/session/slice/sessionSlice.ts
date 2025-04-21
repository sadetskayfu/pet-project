import { createSlice } from "@reduxjs/toolkit"
import { getSessionInfo } from "../services/getSessionInfo"
import { logout } from "../services/logout"
import { rootReducer } from "@/shared/redux/redux"

interface SessionSliceSchema {
    isSessionLoading: boolean
    isLogoutLoading: boolean
}

const initialState: SessionSliceSchema = {
    isSessionLoading: false,
    isLogoutLoading: false
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    selectors: {
        getSessionLoading: (state) => state.isSessionLoading,
        getLogoutLoading: (state) => state.isLogoutLoading
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        // Get session info
        .addCase(getSessionInfo.pending, (state) => {
            state.isSessionLoading = true
        })
        .addCase(getSessionInfo.fulfilled, (state) => {
            state.isSessionLoading = false
        })
        .addCase(getSessionInfo.rejected, (state) => {
            state.isSessionLoading = false
        })
        // Logout
        .addCase(logout.pending, (state) => {
            state.isLogoutLoading = true
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLogoutLoading  = false
        })
        .addCase(logout.rejected, (state) => {
            state.isLogoutLoading  = false
        })
    }
}).injectInto(rootReducer)

export const sessionSelectors = sessionSlice.selectors