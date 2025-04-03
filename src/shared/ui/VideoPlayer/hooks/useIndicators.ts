import { useCallback, useRef, useState } from "react"
import { IndicatorVariant } from "../ui/Indicator/Indicator"
import { VolumeIndicatorVariant } from "../ui/Indicator/VolumeIndicator"

export type Indicator = {
	label?: string
	type: IndicatorVariant
}

export type VolumeIndicator = {
    label?: string
    type: VolumeIndicatorVariant
}

export const useIndicators = () => {
	const [indicator, setIndicator] = useState<Indicator | null>(null)
    const [volumeIndicator, setVolumeIndicator] = useState<VolumeIndicator | null>(null)

	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)
    const volumeTimeoutIdRef = useRef<NodeJS.Timeout | null>(null)

	const showIndicator = useCallback((indicator: Indicator) => {
		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current)
		}

		timeoutIdRef.current = setTimeout(() => setIndicator(null), 1500)
		setIndicator(indicator)
	}, [])

    const showVolumeIndicator = useCallback((indicator: VolumeIndicator) => {
		if (volumeTimeoutIdRef.current) {
			clearTimeout(volumeTimeoutIdRef.current)
		}

		volumeTimeoutIdRef.current = setTimeout(() => setVolumeIndicator(null), 1500)
		setVolumeIndicator(indicator)
	}, [])

	return { indicator, showIndicator, volumeIndicator, showVolumeIndicator }
}
