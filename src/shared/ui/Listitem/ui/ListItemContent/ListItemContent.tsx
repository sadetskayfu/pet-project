import { memo, ReactElement } from 'react'
import styles from './style.module.scss'
import { Typography } from '@/shared/ui/Typography'

interface ListItemContent {
	title?: string
	description?: string
	startSlot?: ReactElement
	endSlot?: ReactElement
}

export const ListItemContent = memo((props: ListItemContent) => {
	const { title, description, startSlot, endSlot } = props

	return (
		<div className={styles['content']}>
			{startSlot && startSlot}
			{(description || title) && (
				<div className={styles['text-wrapper']}>
					<span>{title}</span>
					{description && (
						<Typography size="helper" color="soft" component="p">
							{description}
						</Typography>
					)}
				</div>
			)}
			{endSlot && <span className={styles['end-slot']}>{endSlot}</span>}
		</div>
	)
})
