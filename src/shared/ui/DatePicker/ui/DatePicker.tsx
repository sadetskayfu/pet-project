import {
	forwardRef,
	HTMLAttributes,
	memo,
	ReactElement,
	useCallback,
	useId,
	useMemo,
	useState,
} from 'react'
import {
	Field,
	FieldBorderPlacement,
	FieldSize,
	FieldVariant,
} from '@/shared/ui/Field'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover'
import { DateCalendar } from '@/shared/ui/DateCalendar/ui/DateCalendar'
import { Arrow, Calendar } from '@/shared/assets/icons'
import { useKeyboard } from '../model/useKeyboard'
import { Typography } from '@/shared/ui/Typography'
import { classNames } from '@/shared/helpers/classNames'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { Placement } from '@floating-ui/react'
import { format } from 'date-fns'
import styles from './style.module.scss'

type HTMLProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'>

type DataPickerPopoverProps = {
	placement?: Placement
}

export interface DatePickerProps extends HTMLProps {
	className?: string
	label: string
	name?: string
	placeholder?: string
	defaultValue?: string
	value?: string
	onChange?: (value: string) => void
	variant?: FieldVariant
	size?: FieldSize
	borderPlacement?: FieldBorderPlacement
	hiddenLabel?: boolean
	helperText?: string
	helperTextIds?: string[]
	actions?: (ReactElement | null)[]
	errored?: boolean
	fullWidth?: boolean
	minYear?: number
	maxYear?: number
	required?: boolean
	disabled?: boolean
	readOnly?: boolean
	popoverProps?: DataPickerPopoverProps
}

export const DatePicker = memo(
	forwardRef(
		(props: DatePickerProps, ref: React.ForwardedRef<HTMLDivElement>) => {
			const {
				className,
				placeholder,
				name,
				defaultValue,
				value: controlledValue,
				onChange: controlledOnChange,
				onClick,
				onKeyDown,
				onBlur,
				onFocus,
				minYear,
				maxYear,
				required = false,
				disabled,
				readOnly,
				errored,
				actions: externalActions = [],
				helperText,
				helperTextIds: externalHelperTextIds = [],
				popoverProps = {},
				...otherProps
			} = props

			const { placement = 'bottom-start' } = popoverProps

			const [uncontrolledValue, setUncontrolledValue] = useState<string>(
				defaultValue || ''
			)
			const value = controlledValue ?? uncontrolledValue
			const onChange = controlledOnChange ?? setUncontrolledValue

			const [isFocused, setIsFocused] = useState<boolean>(false)
			const [isOpen, setIsOpen] = useState<boolean>(false)

			const id = useId()
			const labelId = id + 'label'
			const helperTextId = id + 'helper-text'

			const helperTextIds = useMemo(() => {
				if (helperText) {
					return [helperTextId, ...externalHelperTextIds]
				} else {
					return externalHelperTextIds
				}
			}, [externalHelperTextIds, helperText, helperTextId])

			const { handleKeyDown } = useKeyboard({
				setOpen: setIsOpen,
			})

			const handleToggle = useCallback(
				(event: React.MouseEvent<HTMLDivElement>) => {
					setIsOpen((prev) => !prev)
					onClick?.(event)
				},
				[onClick]
			)

			const handleClose = useCallback(() => {
				setIsOpen(false)
			}, [])

			const transformedValueLabel = useMemo(
				() => (value.length > 0 ? format(new Date(value), 'MM/dd/yyyy') : ''),
				[value]
			)

			const actions = useMemo(
				() => [
					...externalActions,
					<span className={styles['arrow']}>
						<Arrow size="xxs" direction="bottom" />
					</span>,
				],
				[externalActions]
			)

			return (
				<Popover
					labelId={labelId}
					modal
					open={isOpen}
					setOpen={setIsOpen}
					placement={placement}
				>
					<PopoverTrigger>
						<Field
							ref={ref}
							containerClassName={className}
							fieldClassName={classNames(styles['data-picker'])}
							focused={isFocused}
							onFocus={mergeEventHandlers([() => setIsFocused(true), onFocus])}
							onBlur={mergeEventHandlers([() => setIsFocused(false), onBlur])}
							onKeyDown={
								readOnly ? undefined : mergeEventHandlers([handleKeyDown, onKeyDown])
							}
							onClick={readOnly ? undefined : handleToggle}
							tabIndex={disabled ? -1 : 0}
							labelId={labelId}
							helperText={helperText}
							helperTextId={helperTextId}
							actions={actions}
							required={required}
							disabled={disabled}
							errored={errored}
							startAdornment={<Calendar size="m" />}
							aria-readonly={readOnly ? 'true' : undefined}
							aria-disabled={disabled ? 'true' : undefined}
							aria-required={required ? 'true' : 'false'}
							aria-invalid={errored ? 'true' : 'false'}
							aria-labelledby={labelId}
							aria-describedby={
								helperTextIds.length > 0 ? helperTextIds.join(' ') : undefined
							}
							{...otherProps}
						>
							<div className={styles['data-picker__content']}>
								{value ? (
									<span>{transformedValueLabel}</span>
								) : placeholder ? (
									<Typography component="span">{placeholder}</Typography>
								) : null}
								<input
									className="visually-hidden"
									aria-hidden="true"
									tabIndex={-1}
									name={name}
									value={value}
									readOnly
								/>
							</div>
						</Field>
					</PopoverTrigger>
					<PopoverContent className={styles['popover-content']}>
						<DateCalendar
							maxYear={maxYear}
							minYear={minYear}
							value={value}
							onChange={onChange}
							onSelectDay={handleClose}
						/>
					</PopoverContent>
				</Popover>
			)
		}
	)
)
