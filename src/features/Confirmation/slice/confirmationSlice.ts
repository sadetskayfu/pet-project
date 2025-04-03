import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { rootReducer } from "@/shared/redux/redux"

interface ConfirmationSliceSchema {
    sessionId: number | null
}

const initialState: ConfirmationSliceSchema = {
    sessionId: null,
}

const confirmationSlice = createSlice({
    name: 'confirmation',
    initialState,
    selectors: {
        getSessionId: (state) => state.sessionId
    },
    reducers: {
        setSessionId: (state, action: PayloadAction<number>) => {
            state.sessionId = action.payload
        }
    },

}).injectInto(rootReducer)

export const confirmationSelectors = confirmationSlice.selectors
export const confirmationActions = confirmationSlice.actions