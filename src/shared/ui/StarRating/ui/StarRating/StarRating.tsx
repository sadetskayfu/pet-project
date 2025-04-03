import { classNames, Mods } from '@/shared/helpers/classNames'
import { Star, StarSize } from '../Star/Star'
import {
	memo,
	useEffect,
	useId,
	useState,
} from 'react'
import { useAnimation } from '@/shared/hooks/useAnimation'
import { Typography } from '@/shared/ui/Typography'
import { Label } from '@/shared/ui/Label'
import styles from './style.module.scss'

export interface StarRatingProps {
	className?: string
	value: number
	hoverValue?: number
	name: string
	label: string
	size?: StarSize
	maxStars?: number
	tabIndex?: number
	disabled?: boolean
	readOnly?: boolean
	required?: boolean
	errored?: boolean
	precise?: boolean
	hiddenLabel?: boolean
	helperText?: string
	firstStarRef?: React.ForwardedRef<HTMLInputElement>
	onChange: (value: number) => void
	onChangeHoverValue?: (value: number) => void
}

export const StarRating = memo((props: StarRatingProps) => {
	const {
		className,
		size = 'm',
		value,
		hoverValue: controlledHoverValue,
		name,
		label,
		maxStars = 5,
		tabIndex = 0,
		disabled,
		readOnly,
		precise,
		errored,
		hiddenLabel = true,
		required,
		helperText,
		firstStarRef,
		onChange,
		onChangeHoverValue: controlledOnChangeHoverValue,
	} = props

	const [uncontrolledHoverValue, setUncontrolledHoverValue] =
		useState<number>(value)
	const { isAnimating, startAnimation } = useAnimation(1000)

	const hoverValue = controlledHoverValue ?? uncontrolledHoverValue
	const onChangeHoverValue =
		controlledOnChangeHoverValue ?? setUncontrolledHoverValue

	const helperTextId = useId()

	const mods: Mods = {
		[styles['hidden-label']]: hiddenLabel,
		[styles['success']]: isAnimating,
		[styles['required']]: required,
		[styles['errored']]: errored,
	}

	useEffect(() => {
		if(value !== hoverValue) {
			onChangeHoverValue(value)
		}
	// eslint-disable-next-line
	}, [value])

	const renderStars = () => {
		return [...Array(maxStars)].map((_, index) => {
			const starValue = index + 1
			const isFullFilled = starValue <= hoverValue
			const isThreeQuartersFilled =
				!isFullFilled && starValue - 0.25 <= hoverValue
			const isHalfFilled =
				!isFullFilled && !isThreeQuartersFilled && starValue - 0.5 <= hoverValue
			const isQuarterFilled =
				!isFullFilled &&
				!isThreeQuartersFilled &&
				!isHalfFilled &&
				starValue - 0.75 <= hoverValue

			const starMods: Mods = {
				[styles['success']]: isAnimating && (isFullFilled || isHalfFilled),
			}

			return (
				<Star
					inputRef={index === 0 ? firstStarRef : undefined}
					key={starValue}
					className={classNames(styles['star'], [], starMods)}
					name={name}
					value={starValue}
					selectedValue={value}
					onChange={onChange}
					onChangeHoverValue={onChangeHoverValue}
					precise={precise}
					disabled={disabled}
					readOnly={readOnly}
					tabIndex={tabIndex}
					size={size}
					fullFilled={isFullFilled}
					halfFilled={isHalfFilled}
					quarterFilled={isQuarterFilled}
					threeQuartersFilled={isThreeQuartersFilled}
				/>
			)
		})
	}

	return (
		<fieldset
			className={classNames(styles['star-rating'], [className], mods)}
			aria-disabled={disabled && 'true'}
			aria-readonly={readOnly && 'true'}
			aria-required={required ? 'true' : 'false'}
			aria-description={helperText ? helperTextId : undefined}
		>
			<Label
				className={classNames(styles['label'], [
					hiddenLabel ? 'visually-hidden' : undefined,
				])}
				component="legend"
				errored={errored}
				required={required}
				disabled={disabled}
			>
				{label}
			</Label>
			<div
				role="radiogroup"
				className={styles['star-group']}
				onMouseLeave={() => onChangeHoverValue(value)}
				onMouseUp={readOnly || disabled ? undefined : startAnimation}
			>
				{renderStars()}
			</div>
			{helperText && (
				<Typography
					id={helperTextId}
					role={errored ? 'alert' : undefined}
					color={errored ? 'error' : 'soft'}
					size="helper"
				>
					{helperText}
				</Typography>
			)}
		</fieldset>
	)
})
