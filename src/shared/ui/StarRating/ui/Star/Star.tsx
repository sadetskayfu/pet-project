import { useId } from 'react'
import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export type StarSize = 's' | 'm'

interface StarProps {
	className?: string
	size?: StarSize
	value: number
	selectedValue: number
	name: string
	fullFilled: boolean
	threeQuartersFilled: boolean
	halfFilled: boolean
	quarterFilled: boolean
	readOnly?: boolean
	disabled?: boolean
	precise?: boolean
	tabIndex?: number
	inputRef?: React.ForwardedRef<HTMLInputElement>
	onChange: (value: number) => void
	onChangeHoverValue: (value: number) => void
}

export const Star = (props: StarProps) => {
	const {
		className,
		size = 'm',
		value,
		selectedValue,
		name,
		fullFilled,
		threeQuartersFilled,
		halfFilled,
		quarterFilled,
		disabled,
		readOnly,
		precise,
		tabIndex = 0,
		inputRef,
		onChange,
		onChangeHoverValue,
	} = props

	const halfLabelId = useId()
	const labelId = useId()

	const halfValue = value - 0.5
	const halfLabel = `${halfValue} Stars`
	const label = value === 1 ? `${value} Star` : `${value} Stars`

	const mods: Mods = {
		[styles['full-filled']]: fullFilled,
		[styles['three-quarters-filled']]: threeQuartersFilled,
		[styles['half-filled']]: halfFilled,
		[styles['quarter-filled']]: quarterFilled,
		[styles['readonly']]: readOnly,
		[styles['disabled']]: disabled,
	}

	const additionalClasses: AdditionalClasses = [className, styles[size]]

	const localTabIndex = disabled || readOnly ? -1 : tabIndex

	return (
		<div className={classNames(styles['star'], additionalClasses, mods)}>
			{precise && (
				<label
					className={styles['label']}
					onMouseEnter={readOnly ? undefined : () => onChangeHoverValue(halfValue)}
					onMouseDown={(event) => event.preventDefault()}
				>
					<input
						ref={inputRef}
						className='visually-hidden'
						type="radio"
						value={halfValue}
						name={name}
						onChange={readOnly ? undefined : () => onChange(halfValue)}
						checked={selectedValue === halfValue}
						readOnly={readOnly}
						disabled={disabled}
						tabIndex={localTabIndex}
						aria-labelledby={halfLabelId}
					/>
					<span className={styles['focus-border']}></span>
					<span id={halfLabelId} className="visually-hidden">
						{halfLabel}
					</span>
				</label>
			)}
			<label
				className={styles['label']}
				onMouseEnter={readOnly ? undefined : () => onChangeHoverValue(value)}
				onMouseDown={(event) => event.preventDefault()}
			>
				<input
					ref={precise ? undefined : inputRef}
					className='visually-hidden'
					type="radio"
					value={value}
					name={name}
					onChange={readOnly ? undefined : () => onChange(value)}
					checked={selectedValue === value}
					readOnly={readOnly}
					disabled={disabled}
					tabIndex={localTabIndex}
					aria-labelledby={labelId}
				/>
				<span className={styles['focus-border']}></span>
				<span id={labelId} className="visually-hidden">
					{label}
				</span>
			</label>
			<span className={styles['icon']}></span>
		</div>
	)
}
