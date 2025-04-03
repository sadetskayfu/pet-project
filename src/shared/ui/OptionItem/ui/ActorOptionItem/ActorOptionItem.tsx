import { Typography } from '@/shared/ui/Typography'
import { OptionItem, OptionItemProps } from '../OptionItem/OptionItem'
import { memo } from 'react'
import { Avatar } from '@/shared/ui/Avatar'
import styles from './style.module.scss'

interface ActorOptionItemProps extends Omit<OptionItemProps, 'children'> {
	firstName: string
	lastName: string
	src?: string | null
}

export const ActorOptionItem = memo((props: ActorOptionItemProps) => {
	const { firstName, lastName, src, value, selected, ...otherProps } = props

	return (
		<OptionItem
			className={styles['option']}
			value={value}
			selected={selected}
			{...otherProps}
		>
			<Avatar
				borderRadius="circular"
				className={styles['avatar']}
				src={src}
			/>
			<Typography color="inherit">
				{firstName} {lastName}
			</Typography>
		</OptionItem>
	)
})
