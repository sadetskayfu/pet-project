import { useMemo, useState } from "react"

const speedArray: string[] = ["0.25", "0.5", "0.75", "1", "1.25", "1.5", "1.75", "2"].reverse()

export const useSpeed = (
	videoRef: React.RefObject<HTMLVideoElement | null>
) => {
	const [speed, setSpeed] = useState<string>("1")

	const handleSpeedChange = (value: string | string[]) => {
		if (videoRef.current) {
			videoRef.current.playbackRate = Number(value as string)
			setSpeed(value as string)
		}
	}

	const speedOptions = useMemo(
		() =>
			speedArray.map((speed) => ({
				value: speed,
				label: speed + "x",
			})),
		[]
	)

	return { handleSpeedChange, speed, speedOptions }
}
