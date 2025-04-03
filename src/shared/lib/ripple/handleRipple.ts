import { ID } from '@/shared/constants/id'
import styles from './style.module.scss'
import { classNames } from '@/shared/helpers/classNames'

export const handleRippleCursorPosition = (
	rippleWrapperRef: React.RefObject<HTMLSpanElement | null>,
	event: React.MouseEvent
) => {
	const rippleWrapper = rippleWrapperRef.current

	if (rippleWrapper) {
		const rect = rippleWrapper.getBoundingClientRect()

		const ripple = document.createElement('span')
		
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top

		ripple.id = ID.RIPPLE
		ripple.className = classNames(styles['ripple'], [styles['default']])
		ripple.style.left = `${x}px`
		ripple.style.top = `${y}px`

		rippleWrapper.appendChild(ripple)

		setTimeout(() => ripple.remove(), 1000)
	}
}

export const handleRipple = (
	rippleWrapperRef: React.RefObject<HTMLSpanElement | null>,
	isSmall: boolean = false
) => {
	const rippleWrapper = rippleWrapperRef.current

	if (rippleWrapper) {
		const ripple = document.createElement('span')
		
		ripple.id = ID.RIPPLE
		ripple.className = classNames(styles['ripple'], [isSmall ? styles['small'] : styles['default']])

		rippleWrapper.appendChild(ripple)

		const timeToRemove = isSmall ? 600 : 1000

		setTimeout(() => ripple.remove(), timeToRemove)
	}
}
