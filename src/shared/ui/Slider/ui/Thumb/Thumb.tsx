import { forwardRef, memo, Suspense } from 'react'
import { SliderColor, SliderOrientation, SliderSize } from '../Slider/Slider'
import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
import {
	TooltipWithoutPortalLazy,
	TooltipWithoutPortalPlacement
} from '@/shared/ui/TooltipWithoutPortal'
import { calculateTranslateThumb } from '../../helpers'
import { Typography } from '@/shared/ui/Typography'
import styles from './style.module.scss'

export interface AriaAttributes {
	"aria-label"?: string
	"aria-labelledby"?: string
}

interface ThumbProps extends AriaAttributes {
	index: number
	value: number
	min: number
	max: number
	name?: string
	orientation: SliderOrientation
	disabled?: boolean
	dragging: boolean
	tooltip: boolean
	size: SliderSize
	color: SliderColor
	tooltipPlacement: TooltipWithoutPortalPlacement
	onKeyDown: (event: React.KeyboardEvent) => void
	onFocus: (index: number) => void
	getTooltipLabel?: (value: number) => string | number
	getAriaValueText?: (value: number) => string
}

export const Thumb = memo(
	forwardRef((props: ThumbProps, ref: React.ForwardedRef<HTMLDivElement>) => {
		const {
			index,
			value,
			min,
			max,
			name,
			orientation,
			disabled,
			dragging,
			tooltip,
			size,
			color,
			tooltipPlacement,
			onKeyDown,
			onFocus,
			getTooltipLabel,
			getAriaValueText,
			...otherProps
		} = props

		const additionalClasses: AdditionalClasses = [
			styles[size],
			styles[orientation],
			styles[color]
		]

		const mods: Mods = {
			[styles['dragging']]: dragging,
		}

		const isHorizontal = orientation === 'horizontal'

		const tooltipLabel = getTooltipLabel ? getTooltipLabel(value) : value
		const ariaValueText = getAriaValueText ? getAriaValueText(value) : value + ''

		const translate = `${calculateTranslateThumb(value, min, max)}%`

		return (
			<div
				className={classNames(styles['thumb'], additionalClasses, mods)}
				ref={ref}
				style={{
					transitionDuration: '0.2s',
					left: isHorizontal ? translate : '',
					bottom: !isHorizontal ? translate : '',
				}}
				tabIndex={disabled ? -1 : 0}
				role="slider"
				aria-disabled={disabled ? 'true' : undefined}
				aria-valuetext={ariaValueText}
				aria-valuenow={value}
				aria-valuemax={max}
				aria-valuemin={min}
				aria-orientation={orientation}
				onKeyDown={onKeyDown}
				onFocus={() => onFocus(index)}
				{...otherProps}
			>
				<input
					name={name}
					value={value}
					aria-hidden='true'
					tabIndex={-1}
					readOnly
					type="range"
				></input>
				{tooltip && (
					<Suspense fallback={null}>
						<TooltipWithoutPortalLazy
							className={styles['tooltip']}
							placement={tooltipPlacement}
							aria-hidden='true'
						>
							<Typography noWrap color='hard' size='default'>{tooltipLabel}</Typography>
						</TooltipWithoutPortalLazy>
					</Suspense>
				)}
			</div>
		)
	})
)
