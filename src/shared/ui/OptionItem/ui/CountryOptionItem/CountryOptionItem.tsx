import { Typography } from '@/shared/ui/Typography'
import { OptionItem, OptionItemProps } from '../OptionItem/OptionItem'
import { memo } from 'react'
import styles from './style.module.scss'

interface CountryOptionItemProps extends Omit<OptionItemProps, 'children'> {
	label: string
	showCode?: boolean
}

export const CountryOptionItem = memo((props: CountryOptionItemProps) => {
	const { label, showCode, value, selected, ...otherProps } = props

	return (
		<OptionItem
			className={styles['option']}
			value={value}
			selected={selected}
			{...otherProps}
		>
			<img
				loading="lazy"
				width={20}
				src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
			/>
			{showCode && (
				<Typography
					className={styles['code']}
					color={selected ? 'inherit' : 'soft'}
				>
					{value}
				</Typography>
			)}
			<Typography color="inherit">{label}</Typography>
		</OptionItem>
	)
})
