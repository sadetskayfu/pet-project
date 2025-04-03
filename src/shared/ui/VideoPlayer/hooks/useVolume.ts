import { useCallback, useState } from "react"
import { VolumeIndicator } from "./useIndicators"

interface UseVolumeProps {
	videoRef: React.RefObject<HTMLVideoElement | null>
	defaultVolume: number
	defaultMuted: boolean
	showIndicator: (indicator: VolumeIndicator) => void
}

export const useVolume = (props: UseVolumeProps) => {
	const { videoRef, defaultVolume, defaultMuted, showIndicator } = props

	const [volume, setVolume] = useState<number>(defaultVolume)
	const [isMuted, setIsMuted] = useState<boolean>(defaultMuted)

	const handleVolumeChange = useCallback(
		(value: number) => {
			if (videoRef.current) {
				videoRef.current.volume = value / 100
				setVolume(value)
			}
		},
		[videoRef]
	)

	const toggleMuted = useCallback(() => {
		setIsMuted((prev) => !prev)
	}, [])

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			switch (event.code) {
				case "ArrowUp":
				case "ArrowDown":
					event.preventDefault()

					const step = event.code === "ArrowDown" ? -5 : 5

                    if(step === -5) {
                        setVolume((prev) => Math.max(prev + step, 0))
                    } else {
                        setVolume((prev) => Math.min(prev + step, 100))
                    }
					
					showIndicator({ type: "volume-change", label: String(volume) })
					break
				case "KeyM":
					setIsMuted((prev) => !prev)
					showIndicator({ type: isMuted ? "unmute" : "mute" })
					break
				default:
					break
			}
		},
		[showIndicator, volume, isMuted]
	)

	return { volume, isMuted, toggleMuted, handleVolumeChange, handleKeyDown }
}
