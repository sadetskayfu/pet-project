import { memo } from 'react'
import { Typography } from '@/shared/ui/Typography'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { classNames } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

interface PaginationCursorProps {
	className?: string
	loading?: boolean
	hasNextPage?: boolean
	message?: string
}

export const PaginationCursor = memo((props: PaginationCursorProps) => {
	const { className, loading, hasNextPage, message } = props

	return (
		<div className={classNames(styles['cursor'], [className])}>
			{loading && <CircularProgress />}
			{!hasNextPage && (
				<Typography textAlign="center" color="soft" size="default">
					{message ?? 'Вы посмотрели все'}
				</Typography>
			)}
		</div>
	)
})
