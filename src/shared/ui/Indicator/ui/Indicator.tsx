import { classNames, Mods } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export type IndicatorPosition = 'top' | 'right' | 'left' | 'bottom'
type IndicatorColor = 'primary' | 'secondary'
type IndicatorWeight = 'soft' | 'hard'

interface IndicatorProps {
	position?: IndicatorPosition
	color?: IndicatorColor
	weight?: IndicatorWeight
	active?: boolean
}

const Indicator = (props: IndicatorProps) => {
	const {
		position = 'bottom',
		color = 'primary',
		weight = 'hard',
		active,
	} = props

	const additionalClasses: Array<string | undefined> = [
		styles[position],
		styles[color],
		styles[weight],
	]

	const mods: Mods = {
		[styles['active']]: active,
	}

	return (
		<span
			className={classNames(styles['indicator'], additionalClasses, mods)}
            aria-hidden='true'
		></span>
	)
}

export default Indicator