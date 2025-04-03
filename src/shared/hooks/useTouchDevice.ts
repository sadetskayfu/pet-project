import { useLayoutEffect, useRef, useState } from 'react'

export const useTouchDevice = () => {
	const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false)
	const isTouchDeviceRef = useRef<boolean>(false)

	useLayoutEffect(() => {
		const isTouchSupported =
			'ontouchstart' in window || // Проверка поддержки сенсорного ввода
			(navigator.maxTouchPoints && navigator.maxTouchPoints > 0) // Проверка точек касания

		const isMobileScreen = window.matchMedia('(max-width: 768px)').matches // Проверка ширины экрана

		const detectedAsTouchDevice = Boolean(isTouchSupported) && isMobileScreen

		isTouchDeviceRef.current = detectedAsTouchDevice
		setIsTouchDevice(detectedAsTouchDevice)
	}, [])

	return { isTouchDevice, isTouchDeviceRef }
}
