import { ApiError } from '../api'

export const getErrorMessage = (error: unknown, message: string) => {
    let errorMessage: string

	if (error instanceof ApiError) {
		errorMessage = error.data.message || message
	} else {
		errorMessage = message
	}

    return errorMessage
}
