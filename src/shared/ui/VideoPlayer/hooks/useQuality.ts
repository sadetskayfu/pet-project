import { useCallback, useMemo, useState } from "react"
import { VideoPlayerSource } from "../ui/VideoPlayer/VideoPlayer"

export type Quality =
	| "144"
	| "240"
	| "360"
	| "720"
	| "1080"
	| "1440"
	| "2160"
	| "4320"

export const useQuality = (sources: VideoPlayerSource[]) => {
	const [quality, setQuality] = useState<Quality>("1080")

	const handleQualityChange = useCallback((value: string | string[]) => {
		setQuality(value as Quality)
	}, [])

	const qualityOptions = useMemo(
		() =>
			sources.map((source) => ({
				value: source.quality,
				label: source.quality + "p",
			})),
		[sources]
	)

	const src = useMemo(
		() =>
			sources.find((source) => source.quality === quality)?.src || sources[0].src,
		[quality, sources]
	)

	return { quality, qualityOptions, src, handleQualityChange }
}
