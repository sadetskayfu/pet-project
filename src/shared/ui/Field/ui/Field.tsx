import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import {
	cloneElement,
	ForwardedRef,
	forwardRef,
	Fragment,
	HTMLAttributes,
	ReactElement,
	ReactNode,
	useCallback,
	useMemo,
	useRef,
} from 'react'
import { Typography } from '@/shared/ui/Typography'
import { Label } from '@/shared/ui/Label'
import { useMergeRefs } from '@floating-ui/react'
import styles from './style.module.scss'

export type FieldVariant = 'filled' | 'outlined' | 'standard'
export type FieldSize = 'm' | 'l'
export type FieldBorderPlacement = 'left' | 'right' | 'all'

interface FieldProps {
	children: ReactElement<HTMLElement>
	label: string
	labelId: string
	inputId?: string
	containerClassName?: string
	fieldClassName?: string
	variant?: FieldVariant
	size?: FieldSize
	borderPlacement?: FieldBorderPlacement
	hiddenLabel?: boolean
	focused?: boolean
	errored?: boolean
	actions?: (ReactElement | null)[]
	startAdornment?: ReactNode
	helperText?: string | null
	helperTextId?: string
	targetFocusRef?: React.RefObject<HTMLElement | null>
	disabled?: boolean
	required?: boolean
	textField?: boolean
	fullWidth?: boolean
}

export type HTMLFieldProps = Omit<HTMLAttributes<HTMLElement>, keyof FieldProps>

export const Field = forwardRef(
	(props: FieldProps & HTMLFieldProps, ref: ForwardedRef<HTMLDivElement>) => {
		const {
			children,
			label,
			labelId,
			inputId,
			fieldClassName,
			containerClassName,
			variant = 'outlined',
			size = 'm',
			borderPlacement = 'all',
			hiddenLabel,
			focused,
			errored,
			actions = [],
			startAdornment,
			helperText,
			helperTextId,
			targetFocusRef,
			disabled,
			required,
			fullWidth,
			textField,
			onClick,
			...otherProps
		} = props

		const fieldRef = useRef<HTMLDivElement>(null)

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLDivElement>) => {
				const targetFocus = targetFocusRef?.current

				if (targetFocus) {
					if (document.activeElement !== targetFocus) {
						targetFocus.focus()
					}
				}
				onClick?.(event)
			},
			[onClick, targetFocusRef]
		)

		const memoizeActions = useMemo(() => {
			if (!actions.length) return null

			return actions.map((action, index) => {
				return <Fragment key={index}>{action}</Fragment>
			})
		}, [actions])

		const additionalClasses: AdditionalClasses = [
			containerClassName,
			styles[variant],
			styles[size],
			styles[borderPlacement],
		]

		const mods: Mods = {
			[styles['with-adornment']]: !!startAdornment,
			[styles['with-actions']]: actions.length > 0,
			[styles['text-field']]: textField,
			[styles['focused']]: focused,
			[styles['errored']]: errored,
			[styles['disabled']]: disabled,
			[styles['required']]: required,
			[styles['full-width']]: fullWidth,
			[styles['hidden-label']]: hiddenLabel,
		}

		return (
			<div
				className={classNames(styles['field-container'], additionalClasses, mods)}
			>
				<Label
					className={classNames(styles['label'], [
						hiddenLabel ? 'visually-hidden' : undefined,
					])}
					component="label"
					errored={errored}
					focused={focused}
					required={required}
					disabled={disabled}
					id={labelId}
					inputId={inputId}
					targetFocusRef={targetFocusRef ? targetFocusRef : fieldRef}
				>
					{label}
				</Label>
				<div
					className={classNames(styles['field'], [fieldClassName])}
					onClick={handleClick}
					ref={useMergeRefs([ref, fieldRef])}
					{...otherProps}
				>
					{startAdornment && (
						<div className={styles['start-adornment']}>{startAdornment}</div>
					)}
					{cloneElement(children, {
						className: classNames(styles['children'], [children.props.className]),
					})}
					{memoizeActions && (
						<div className={styles['actions']}>{memoizeActions}</div>
					)}
					{variant === 'outlined' && (
						<fieldset className={styles['fieldset']} aria-hidden="true">
							<legend className={styles['legend']}>
								{hiddenLabel ? null : (
									<>
										{label}
										{required && ' *'}
									</>
								)}
							</legend>
						</fieldset>
					)}
				</div>
				{helperText && (
					<Typography
						className={styles['helper-text']}
						id={helperTextId}
						size="helper"
						color={errored ? 'error' : 'soft'}
						role={errored ? 'alert' : undefined}
					>
						{helperText}
					</Typography>
				)}
			</div>
		)
	}
)
