import { ForwardedRef, forwardRef, ReactNode, useEffect, useRef } from 'react'
import { useTimer } from '@/shared/hooks'
import { AdditionalClasses, classNames } from '@/shared/helpers/classNames'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { useMergeRefs } from '@floating-ui/react'
import styles from './style.module.scss'

type SnackbarBorderRadius = 'm' | 'l' | 'none'

interface SnackbarProps {
	className?: string
	children: ReactNode
	autoHideDuration?: number
	onClose?: () => void
	style?: React.CSSProperties
	borderRadius?: SnackbarBorderRadius
}

export const Snackbar = forwardRef(
	(props: SnackbarProps, ref: ForwardedRef<HTMLDivElement>) => {
		const { className, children, autoHideDuration, style, borderRadius = 'm', onClose } = props

		const autoHideTimeoutIdRef = useRef<NodeJS.Timeout | null>(null)
		const snackbarRef = useRef<HTMLDivElement>(null)

		const { startTimer, endTimer, time } = useTimer({
			variant: 'decr',
			enabled: !!autoHideDuration,
		})

		// Auto hide
		useEffect(() => {
			if (autoHideDuration && onClose) {
				autoHideTimeoutIdRef.current = setTimeout(() => {
					onClose()
				}, autoHideDuration + 1000)
			}
			return () => {
				if (autoHideTimeoutIdRef.current) clearTimeout(autoHideTimeoutIdRef.current)
				endTimer()
			}
			// eslint-disable-next-line
		}, [])

		useEffect(() => {
			if (autoHideDuration) {
				startTimer(autoHideDuration ? autoHideDuration / 1000 : 0, 0)
			}
		}, [autoHideDuration, startTimer])

		const additionalClasses: AdditionalClasses = [
			className,
			styles[borderRadius]
		]

		return (
			<div ref={useMergeRefs([ref, snackbarRef])} style={style} className={classNames(styles['snackbar'], additionalClasses)}>
				{children}
				{autoHideDuration && (
					<CircularProgress
						className={styles['progress']}
						value={time}
						maxValue={autoHideDuration / 1000}
						minValue={0}
						color="secondary"
						size="m"
						label={time}
					/>
				)}
			</div>
		)
	}
)
