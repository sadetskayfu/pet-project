import { useCallback, useState } from "react"
import { Indicator } from "./useIndicators"

interface UseProgressProps {
	videoRef: React.RefObject<HTMLVideoElement | null>
	duration: number
    showIndicator: (indicator: Indicator) => void
    setVisibleControlPanel: () => void
}

export const useProgress = (props: UseProgressProps) => {
	const { videoRef, duration, showIndicator, setVisibleControlPanel } = props

	const [progress, setProgress] = useState<number>(0)

	const handleProgressChange = useCallback(
		(value: number) => {
			const video = videoRef.current

			if (!video) return

			video.currentTime = value
			setProgress(value)
		},
		[videoRef]
	)

	const rewindBySeconds = useCallback(
		(seconds: number, direction: -1 | 1) => {
			const video = videoRef.current

			if (!video) return

			const newTime = Math.max(
				Math.min(video.currentTime + seconds * direction, duration),
				0
			)

			video.currentTime = newTime
			setProgress(newTime)
		},
		[videoRef, duration]
	)

	const handleRewindPrev = useCallback(() => {
		rewindBySeconds(5, -1)
	}, [rewindBySeconds])

	const handleRewindNext = useCallback(() => {
		rewindBySeconds(5, 1)
	}, [rewindBySeconds])

	const handleTimeUpdate = useCallback(() => {
		const video = videoRef.current

		if (!video) return

		setProgress(Math.trunc(video.currentTime))
	}, [videoRef])

	const handleKeyDownProgress = useCallback(
		(event: React.KeyboardEvent) => {
			const video = videoRef.current

			if(!video) return

			const isShortVideo = video.duration < 60
			const lessSeconds = isShortVideo ? 1 : 5
			const moreSeconds = isShortVideo ? 2 : 10

			switch (event.code) {
				case "ArrowRight":
					rewindBySeconds(lessSeconds, 1)
                    showIndicator({type: 'fast-forward', label: `${lessSeconds}s`})
                    setVisibleControlPanel()
					break
				case "ArrowLeft":
					rewindBySeconds(lessSeconds, -1)
                    showIndicator({type: 'rewind', label: `${lessSeconds}s`})
                    setVisibleControlPanel()
					break
				case "KeyJ":
					rewindBySeconds(moreSeconds, -1)
                    showIndicator({type: 'rewind', label: `${moreSeconds}s`})
                    setVisibleControlPanel()
					break
				case "KeyL":
					rewindBySeconds(moreSeconds, 1)
                    showIndicator({type: 'fast-forward', label: `${moreSeconds}s`})
                    setVisibleControlPanel()
					break
				case "Home":
					handleProgressChange(0)
                    setVisibleControlPanel()
					break
				case "End":
					handleProgressChange(duration)
                    setVisibleControlPanel()
					break
				case "Digit1":
				case "Digit2":
				case "Digit3":
				case "Digit4":
				case "Digit5":
				case "Digit6":
				case "Digit7":
				case "Digit8":
				case "Digit9":
					handleProgressChange(Math.trunc(duration / 10 * Number(event.code.slice(-1))))
                    setVisibleControlPanel()
					break
			}
		},
		[handleProgressChange, rewindBySeconds, showIndicator, setVisibleControlPanel, videoRef, duration]
	)

	return {
		progress,
		handleProgressChange,
		handleRewindNext,
		handleRewindPrev,
		handleTimeUpdate,
		handleKeyDownProgress,
	}
}
