import {
	Field,
	FieldBorderPlacement,
	FieldSize,
	FieldVariant,
	HTMLFieldProps,
} from '@/shared/ui/Field'
import {
	forwardRef,
	InputHTMLAttributes,
	memo,
	ReactElement,
	ReactNode,
	Suspense,
	useCallback,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react'
import { classNames, Mods } from '@/shared/helpers/classNames/classNames'
import { IconButtonLazy } from '@/shared/ui/IconButton'
import { XMark } from '@/shared/assets/icons'
import { useMergeRefs } from '@floating-ui/react'
import styles from './style.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export interface TextFieldProps extends HTMLInputProps {
	className?: string
	label: string
	labelId?: string
	variant?: FieldVariant
	size?: FieldSize
	borderPlacement?: FieldBorderPlacement
	hiddenLabel?: boolean
	helperText?: string
	helperTextIds?: string[]
	actions?: (ReactElement | null)[]
	startAdornment?: ReactNode
	errored?: boolean
	fullWidth?: boolean
	fieldRef?: React.RefObject<HTMLDivElement>
	fieldProps?: HTMLFieldProps
	clearButton?: boolean
	defaultDirty?: boolean
	onClear?: (name: string) => void
}

export const TextField = memo(
	forwardRef(
		(props: TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
			const {
				className,
				label,
				labelId: externalLabelId,
				variant,
				size,
				borderPlacement,
				hiddenLabel,
				helperText,
				helperTextIds: externalHelperTextIds = [],
				actions: externalActions,
				startAdornment,
				tabIndex = 0,
				fullWidth,
				defaultDirty = false,
				onFocus,
				onBlur,
				onChange,
				onClear,
				onMouseDown,
				clearButton: showClearButton,
				errored,
				readOnly,
				disabled,
				required,
				fieldRef,
				fieldProps,
				type = 'text',
				name,
				...otherProps
			} = props

			const [isDirty, setIsDirty] = useState<boolean>(defaultDirty)
			const [isFocused, setIsFocused] = useState<boolean>(false)

			const inputRef = useRef<HTMLInputElement>(null)

			const mergeRef = useMergeRefs([ref, inputRef])

			const id = useId()
			const inputId = id + 'input'
			const localLabelId = id + 'label'
			const helperTextId = id + 'helper-text'
			const labelId = externalLabelId ? externalLabelId : localLabelId

			const helperTextIds = useMemo(() => {
				if (helperText) {
					return [helperTextId, ...externalHelperTextIds]
				} else {
					return externalHelperTextIds
				}
			}, [externalHelperTextIds, helperTextId, helperText])

			const handleClear = useCallback(() => {
				if (onClear) {
					onClear(name || '')
				} else {
					if (inputRef.current) {
						inputRef.current.value = ''
					}
				}

				setIsDirty(false)
			}, [name, onClear])

			const handleChange = useCallback(
				(event: React.ChangeEvent<HTMLInputElement>) => {
					onChange?.(event)

					if (showClearButton) {
						const value = event.target.value
						setIsDirty(value.length > 0)
					}
				},
				[onChange, showClearButton]
			)

			const handleFocus = useCallback(
				(event: React.FocusEvent<HTMLInputElement>) => {
					setIsFocused(true)
					onFocus?.(event)
				},
				[onFocus]
			)

			const handleBlur = useCallback(
				(event: React.FocusEvent<HTMLInputElement>) => {
					setIsFocused(false)
					onBlur?.(event)
				},
				[onBlur]
			)

			const actions = useMemo(() => {
				if (!showClearButton) return externalActions

				const clearButton = (
					<Suspense fallback={null}>
						<IconButtonLazy
							className={styles['clear-button']}
							onClick={handleClear}
							variant="clear"
							color="secondary"
							tabIndex={-1}
							stopFocus
						>
							<XMark />
						</IconButtonLazy>
					</Suspense>
				)

				return [clearButton, ...(externalActions || [])]
			}, [externalActions, showClearButton, handleClear])

			const mods: Mods = {
				[styles['dirty']]: isDirty,
				[styles['focused']]: isFocused,
				[styles['readonly']]: readOnly,
			}

			return (
				<Field
					containerClassName={className}
					fieldClassName={classNames(styles['field'], [], mods)}
					label={label}
					labelId={labelId}
					inputId={inputId}
					variant={variant}
					size={size}
					borderPlacement={borderPlacement}
					hiddenLabel={hiddenLabel}
					errored={errored}
					focused={isFocused}
					startAdornment={startAdornment}
					actions={actions}
					helperText={helperText}
					helperTextId={helperTextId}
					targetFocusRef={inputRef}
					disabled={disabled}
					required={required}
					fullWidth={fullWidth}
					ref={fieldRef}
					textField
					onMouseDown={(event) => event.preventDefault()}
					{...fieldProps}
				>
					<input
						className={styles['input']}
						id={inputId}
						ref={mergeRef}
						name={name}
						type={type}
						disabled={disabled}
						required={required}
						readOnly={readOnly}
						tabIndex={disabled ? -1 : tabIndex}
						onChange={handleChange}
						onBlur={handleBlur}
						onFocus={handleFocus}
						onMouseDown={(event) => {
							event.stopPropagation()
							onMouseDown?.(event)
						}}
						aria-describedby={
							helperTextIds.length > 0
								? helperTextIds.join(' ')
								: undefined
						}
						aria-invalid={errored ? 'true' : 'false'}
						{...otherProps}
					/>
				</Field>
			)
		}
	)
)
