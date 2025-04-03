import { memo } from 'react'
import { Typography } from '@/shared/ui/Typography'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { classNames } from '@/shared/helpers/classNames'
import { useIntersection } from '@/shared/hooks'
import styles from './style.module.scss'

interface PaginationCursorProps {
	className?: string
	loading?: boolean
	hasNextPage?: boolean
	message?: string
	onFetchNextPage: () => void
}

export const PaginationCursor = memo((props: PaginationCursorProps) => {
	const { className, loading, hasNextPage, message, onFetchNextPage } = props

	const cursorRef = useIntersection(() => onFetchNextPage())

	return (
		<div ref={cursorRef} className={classNames(styles['cursor'], [className])}>
			{loading && <CircularProgress />}
			{!hasNextPage && (
				<Typography component='p' textAlign="center" color="soft" size="default">
					{message ?? 'There is nothing else'}
				</Typography>
			)}
		</div>
	)
})
