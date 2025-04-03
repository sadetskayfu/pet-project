import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
import { SliderOrientation, SliderSize } from '../../../Slider/Slider'
import { memo } from 'react'
import styles from './style.module.scss'

export type MarkerLabelPlacement = 'top' | 'bottom' | 'left' | 'right'

interface MarkerProps {
	label: string | number
    size: SliderSize
	labelPlacement: MarkerLabelPlacement
	orientation: SliderOrientation
	position: string
    active: boolean
    visibleLabel?: boolean
}

export const Marker = memo((props: MarkerProps) => {
	const { label, size, labelPlacement, orientation, position, visibleLabel, active } = props

	const isHorizontal = orientation === 'horizontal'

	const additionalClasses: AdditionalClasses = [
        styles[size],
		styles[labelPlacement],
		styles[orientation]
	]

    const mods: Mods = {
        [styles['active']]: active
    }

	return (
		<span
			className={classNames(styles['marker'], additionalClasses, mods)}
			style={{
				left: isHorizontal ? position : '',
				bottom: !isHorizontal ? position : '',
			}}
		>
			{visibleLabel && <span className={styles['label']} aria-hidden='true'>{label}</span>}
		</span>
	)
})
