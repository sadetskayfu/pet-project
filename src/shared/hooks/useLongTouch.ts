import { useEffect, useRef } from 'react'

type EventType = any

type UseLongTouchProps = {
	onTouchStart: (event: EventType) => void
	onTouchEnd?: (event: EventType) => void
	timeToStart?: number
	timeToEnd?: number
	enabled?: boolean
}

export const useLongTouch = (props: UseLongTouchProps) => {
	const {
		onTouchStart,
		onTouchEnd,
		enabled = true,
		timeToStart = 500,
		timeToEnd = 2000,
	} = props

	const startTimeoutIdRef = useRef<NodeJS.Timeout | null>(null)
	const endTimeoutIdRef = useRef<NodeJS.Timeout | null>(null)

	const handleTouchStart = enabled
		? (event: EventType) => {
				if (endTimeoutIdRef.current) {
					clearTimeout(endTimeoutIdRef.current)
				}
				startTimeoutIdRef.current = setTimeout(() => {
					onTouchStart(event)
				}, timeToStart)
			}
		: undefined

	const handleTouchEnd = enabled
		? (event: EventType) => {
				if (startTimeoutIdRef.current) {
					clearTimeout(startTimeoutIdRef.current)
				}
				if (onTouchEnd) {
					endTimeoutIdRef.current = setTimeout(() => {
						onTouchEnd(event)
					}, timeToEnd)
				}
			}
		: undefined

	useEffect(() => {
		return () => {
			if (startTimeoutIdRef.current) {
				clearTimeout(startTimeoutIdRef.current)
			}
			if (endTimeoutIdRef.current) {
				clearTimeout(endTimeoutIdRef.current)
			}
		}
	}, [])

	return { handleTouchStart, handleTouchEnd }
}
