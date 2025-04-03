import { Typography, TypographyProps } from '@/shared/ui/Typography'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip'
import { Info } from '@/shared/assets/icons/ui/Info'
import styles from './style.module.scss'
import { classNames } from '@/shared/helpers/classNames'

interface OverflowTextProps extends Omit<TypographyProps, 'children'> {
	text: string
	maxCharacters: number
	showTooltip?: boolean
}

export const OverflowText = (props: OverflowTextProps) => {
	const { text, maxCharacters, showTooltip, className, ...otherProps } = props

	if (text.length <= maxCharacters) {
		return <Typography className={className} {...otherProps}>{text}</Typography>
	}

	const visibleText = text.slice(0, maxCharacters) + '..'

	return (
		<Typography className={classNames(styles['text'], [className], {[styles['with-tooltip']]: showTooltip})} {...otherProps}>
			{visibleText}
			{showTooltip && (
				<Tooltip>
					<TooltipTrigger>
						<span className={styles['icon']}>
							<Info size="xs" color="primary" />
						</span>
					</TooltipTrigger>
					<TooltipContent>
						<Typography color="hard" size="helper">
							{text}
						</Typography>
					</TooltipContent>
				</Tooltip>
			)}
		</Typography>
	)
}
