import { useState } from "react"

export const useError = () => {
	const [error, setError] = useState<string | null>(null)

	const handleError = (event: React.SyntheticEvent<HTMLVideoElement>) => {
		const video = event.target as HTMLVideoElement

		let errorMessage = "Произошла ошибка при загрузке видео"

		switch (video.error?.code) {
			case MediaError.MEDIA_ERR_ABORTED:
				errorMessage = "Загрузка видео была прервана"
				break
			case MediaError.MEDIA_ERR_NETWORK:
				errorMessage = "Ошибка сети при загрузке видео"
				break
			case MediaError.MEDIA_ERR_DECODE:
				errorMessage = "Ошибка декодирования видео"
				break
			case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
				errorMessage = "Видео не найдено или формат не поддерживается"
				break
			default:
				break
		}

		setError(errorMessage)
	}

	return { error, handleError, clearError: () => setError(null) }
}
