import {
	InputHTMLAttributes,
	memo,
	ReactElement,
	ReactNode,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react'
import {
	flip,
	offset,
	Placement,
	size as floatingSize,
	useFloating,
	autoUpdate,
	FloatingPortal,
	useMergeRefs,
} from '@floating-ui/react'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { useOptions } from '@/shared/lib/select'
import {
	useChangeValue,
	useNavigation,
	useRefValues,
	hasSelectedValue,
} from '../model'
import { OptionItem } from '@/shared/ui/OptionItem'
import { filterByIncludes } from '@/shared/helpers/filters'
import { Typography } from '@/shared/ui/Typography'
import {
	Field,
	FieldBorderPlacement,
	FieldSize,
	FieldVariant,
	HTMLFieldProps,
} from '@/shared/ui/Field'
import { Arrow, XMark } from '@/shared/assets/icons'
import { IconButton } from '@/shared/ui/IconButton'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import styles from './styles.module.scss'

type MenuProps = {
	className?: string
	placement?: Placement
	offset?: number
	flipPadding?: number
	width?: number
	height?: number
	cols?: number
}

type RenderOptionProps = {
	id: string
	selected: boolean
	disabled: boolean
}

export type ValueType<T, M> = T extends string ? M extends true ? T[] : M extends false ? T : T[] : M extends false ? T | null : T[]

export interface AutocompleteProps<T, M extends boolean = false>
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'value' | 'defaultValue' | 'onChange' | 'size'
	> {
	label: string
	options: T[]
	defaultValue?: ValueType<T, M>
	value?: ValueType<T, M>
	inputValue?: string
	onChangeInputValue?: (value: string) => void
	onChange?: (value: ValueType<T, M>) => void
	initialOpen?: boolean
	open?: boolean
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	menuProps?: MenuProps
	loading?: boolean
	notFilter?: boolean
	fixedHeight?: boolean
	fullWidth?: boolean
	hiddenLabel?: boolean
	errored?: boolean
	multiple?: M
	freeSolo?: boolean
	helperText?: string
	helperTextIds?: string[]
	variant?: FieldVariant
	size?: FieldSize
	borderPlacement?: FieldBorderPlacement
	startAdornment?: ReactNode
	actions?: (ReactElement | null)[]
	inputRef?: React.RefObject<HTMLInputElement>
	fieldRef?: React.RefObject<HTMLDivElement>
	HTMLfieldProps?: HTMLFieldProps
	getOptionValue?: (option: T) => string
	getOptionLabel?: (option: T) => string
	getOptionDisabled?: (option: T) => boolean
	renderOption?: (
		option: T,
		{ id, disabled, selected }: RenderOptionProps
	) => ReactElement
	renderValue?: (option: T, onDelete: () => void) => ReactElement
}

export const AutocompleteComponent = <T, M extends boolean = false>(props: AutocompleteProps<T, M>) => {
	const {
		className,
		label,
		options,
		value: controlledValue,
		inputValue: controlledInputValue,
		onChange: controlledOnChange,
		onChangeInputValue: controlledOnChangeInputValue,
		defaultValue = null,
		initialOpen = false,
		open: controlledOpen,
		setOpen: setControlledOpen,
		onBlur,
		onFocus,
		menuProps = {},
		loading = false,
		notFilter,
		fixedHeight,
		required,
		readOnly,
		disabled,
		errored,
		helperText,
		helperTextIds: externalHelperTextIds = [],
		fullWidth,
		hiddenLabel,
		variant,
		size,
		borderPlacement,
		startAdornment,
		freeSolo = false,
		actions: externalActions = [],
		inputRef: externalInputRef,
		fieldRef,
		HTMLfieldProps,
		getOptionValue = (option) => option as string,
		getOptionLabel = (option) => option as string,
		getOptionDisabled,
		renderOption,
		renderValue,
		...otherProps
	} = props

	const {
		className: menuClassName,
		placement = 'bottom-start',
		offset: offsetValue = 5,
		flipPadding = 5,
		width,
		height,
		cols = 1,
	} = menuProps

	const isMulti = Array.isArray(defaultValue) || Array.isArray(controlledValue)

	const [isFocused, setIsFocused] = useState<boolean>(false)
	const [isFilterOptions, setIsFilterOptions] = useState<boolean>(false)
	const [uncontrolledValue, setUncontrolledValue] = useState<T[] | T | null>(
		defaultValue
	)

	const value = controlledValue ?? uncontrolledValue

	const [uncontrolledInputValue, setUncontrolledInputValue] = useState<string>(
		!isMulti && value ? getOptionLabel(value as T) : ''
	)
	const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(initialOpen)

	const isOpen = controlledOpen ?? uncontrolledOpen
	const inputValue = controlledInputValue ?? uncontrolledInputValue

	const isDirty = (hasSelectedValue(value) || Boolean(inputValue)) && !readOnly

	const setIsOpen = setControlledOpen ?? setUncontrolledOpen
	const onChangeInputValue =
		controlledOnChangeInputValue ?? setUncontrolledInputValue
	const onChange = controlledOnChange ?? setUncontrolledValue

	const id = useId()
	const labelId = id + 'label'
	const inputId = id + 'input'
	const optionListId = id + 'option-list'
	const optionId = id + 'option'
	const helperTextId = id + 'helper-text'

	const { refs, floatingStyles } = useFloating({
		placement,
		open: isOpen,
		onOpenChange: setIsOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(offsetValue),
			flip({ padding: flipPadding }),
			floatingSize({
				apply({ rects, elements, availableHeight }) {
					Object.assign(elements.floating.style, {
						maxHeight: height ? `${height / 16}rem` : `${availableHeight}px`,
						maxWidth: width ? `${width / 16}rem` : `${rects.reference.width}px`,
					})
				},
				padding: flipPadding,
			}),
		],
	})

	const optionListRef = useRef<HTMLUListElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const mergeInputRef = useMergeRefs([inputRef, externalInputRef])
	const mergeOptionListRef = useMergeRefs([optionListRef, refs.setFloating])

	const recordOptions = useMemo(() => {
		const opt: Record<string, T> = {}

		options.forEach((option) => {
			opt[getOptionValue(option)] = option
		})

		return opt
		// eslint-disable-next-line
	}, [options])

	const { optionsRef, isOptionsReady } = useOptions({
		optionListRef,
		isMounted: isOpen,
		isLoading: loading,
	})

	const { valueRef, inputValueRef, isOpenRef } = useRefValues({
		inputValue,
		value,
		isOpen,
	})

	const { handleClick, handleDelete, handleSelect } = useChangeValue<T, M>({
		valueRef,
		inputValue,
		options: recordOptions,
		getOptionValue,
		getOptionLabel,
		onChange,
		onChangeInputValue,
		setIsOpen,
		freeSolo,
	})

	const { handleKeyDown, handleMouseMove, activeOptionId, setActiveOption } =
		useNavigation<T>({
			valueRef,
			inputValueRef,
			isOpen,
			isOpenRef,
			isOptionsReady,
			isLoading: loading,
			isFreeSolo: freeSolo,
			cols,
			optionListRef,
			optionsRef,
			setIsOpen,
			getOptionValue,
			onDelete: handleDelete,
			onSelect: handleSelect,
		})

	const handleClear = useCallback(() => {
		const value = valueRef.current

		if (value) {
			onChange([] as ValueType<T, M>)
		} else {
			if (typeof value === 'string') {
				onChange('' as ValueType<T, M>)
			} else {
				onChange(null as ValueType<T, M>)
			}
		}
		onChangeInputValue('')
		setActiveOption(-1)
	}, [onChange, onChangeInputValue, setActiveOption, valueRef])

	const handleChangeInputValue = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onChangeInputValue(event.target.value)
			setActiveOption(-1)

			if (!isOpenRef.current) {
				setIsOpen(true)
			}

			if (!notFilter) {
				setIsFilterOptions(true)
			}
		},
		[onChangeInputValue, setActiveOption, setIsOpen, notFilter, isOpenRef]
	)

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if (!freeSolo) {
			if (Array.isArray(value)) {
				onChangeInputValue('')
			} else {
				onChangeInputValue(value ? getOptionLabel(value as T) : '')
			}
		}

		onBlur?.(event)
		setIsOpen(false)
		setIsFocused(false)
		setIsFilterOptions(false)
	}

	const handleFocus = useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			onFocus?.(event)
			setIsFocused(true)
		},
		[onFocus]
	)

	const handleToggleMenu = useCallback(() => {
		setIsOpen((prev) => !prev)
	}, [setIsOpen])

	const renderOptions = useMemo(
		() => {
			if(!isOpen) return

			if (loading) {
				return (
					<OptionItem aria-hidden="true" value="" readOnly>
						Loading...
					</OptionItem>
				)
			}

			if (options.length === 0) {
				return (
					<OptionItem role="alert" value="" readOnly>
						No options
					</OptionItem>
				)
			}

			return options.map((option, index) => {
				console.log('Render options')

				const optionLabel = getOptionLabel(option)
				const optionValue = getOptionValue(option)

				const isDisabled = getOptionDisabled ? getOptionDisabled(option) : false
				const isSelected =
					hasSelectedValue(value) &&
					(Array.isArray(value)
						? Boolean(value.find((v) => getOptionValue(v) === optionValue))
						: getOptionValue(value as T) === optionValue)

				if (renderOption) {
					return renderOption(option, {
						id: optionId + (index + 1),
						disabled: isDisabled,
						selected: isSelected,
					})
				}

				return (
					<OptionItem
						key={optionValue}
						id={optionId + (index + 1)}
						value={optionValue}
						selected={isSelected}
						disabled={isDisabled}
					>
						{optionLabel}
					</OptionItem>
				)
			})
		},
		// eslint-disable-next-line
		[value, options, optionId, loading, isOpen]
	)

	const renderFilteredOptions = useMemo(
		() => {
			if (
				isFilterOptions &&
				!notFilter &&
				inputValue !== '' &&
				Array.isArray(renderOptions)
			) {
				console.log('Filter options')

				const filteredOptions = renderOptions.filter((option) => {
					const optionLabel = getOptionLabel(recordOptions[option.props.value])

					return filterByIncludes(optionLabel, inputValue)
				})

				if (filteredOptions.length === 0) {
					return (
						<OptionItem readOnly value="">
							No options
						</OptionItem>
					)
				} else {
					return filteredOptions
				}
			} else {
				return renderOptions
			}
		},
		// eslint-disable-next-line
		[inputValue, recordOptions, renderOptions, notFilter, isFilterOptions]
	)

	const renderSelectedValue = useMemo(
		() => {
			const isMulti = Array.isArray(value)

			if (isMulti && value.length > 0) {
				console.log('Render value')

				if (renderValue) {
					return value.map((v) => {
						return renderValue(v, () =>
							readOnly ? undefined : handleDelete(getOptionValue(v))
						)
					})
				} else {
					const optionLabels = value.map((v) => getOptionLabel(v))
					return (
						<Typography color="hard" noWrap={fixedHeight ? true : false}>
							{optionLabels.join(', ')}
						</Typography>
					)
				}
			}
		},
		// eslint-disable-next-line
		[value, readOnly, fixedHeight, handleDelete]
	)

	// Reset filter after close menu if input value === value
	useEffect(() => {
		if (
			!isMulti &&
			!notFilter &&
			!isOpen &&
			value &&
			inputValue === getOptionLabel(value as T) &&
			isFilterOptions
		) {
			setIsFilterOptions(false)
		}
		// eslint-disable-next-line
	}, [isOpen])

	// For reset input value, if you reset value
	useEffect(() => {
		if (!isMulti && !hasSelectedValue(value)) {
			onChangeInputValue('')
		}
		// eslint-disable-next-line
	}, [value])

	const helperTextIds = useMemo(() => {
		if (helperText) {
			return [helperTextId, ...externalHelperTextIds]
		} else {
			return externalHelperTextIds
		}
	}, [externalHelperTextIds, helperText, helperTextId])

	const actions = useMemo(
		() => [
			loading ? (
				<CircularProgress color="secondary" aria-label="Loading options" />
			) : null,
			...externalActions,
			<IconButton
				className={styles['clear-button']}
				variant="clear"
				tabIndex={-1}
				stopPropagation
				onClick={readOnly ? undefined : handleClear}
			>
				<XMark />
			</IconButton>,
			<span className={styles['arrow']}>
				<Arrow direction="bottom" size="xxs" />
			</span>,
		],
		[externalActions, handleClear, readOnly, loading]
	)

	const mods: Mods = {
		[styles['open']]: isOpen,
		[styles['dirty']]: isDirty,
		[styles['focused']]: isFocused,
		[styles['fixed-height']]: fixedHeight,
	}

	const sharedInputProps: InputHTMLAttributes<HTMLInputElement> = {
		id: inputId,
		value: inputValue,
		onChange: handleChangeInputValue,
		onBlur: handleBlur,
		onFocus: handleFocus,
		onKeyDown: readOnly ? undefined : handleKeyDown,
		readOnly,
		disabled,
		required,
		'aria-describedby':
			helperTextIds.length > 0 ? helperTextIds.join(' ') : undefined,
		'aria-haspopup': 'listbox',
		'aria-controls': isOpen ? optionListId : undefined,
		'aria-expanded': isOpen ? 'true' : 'false',
		'aria-invalid': errored ? 'true' : 'false',
		'aria-activedescendant': isOpen ? activeOptionId : undefined,
		autoCapitalize: 'none',
		autoComplete: 'off',
	}

	return (
		<>
			<Field
				containerClassName={className}
				fieldClassName={classNames(styles['autocomplete'], [], mods)}
				ref={useMergeRefs([refs.setReference, fieldRef])}
				label={label}
				labelId={labelId}
				inputId={inputId}
				onClick={readOnly ? undefined : handleToggleMenu}
				onMouseDown={(event) => event.preventDefault()}
				targetFocusRef={inputRef}
				focused={isFocused}
				fullWidth={fullWidth}
				hiddenLabel={hiddenLabel}
				disabled={disabled}
				required={required}
				errored={errored}
				variant={variant}
				size={size}
				borderPlacement={borderPlacement}
				helperText={helperText}
				startAdornment={startAdornment}
				actions={actions}
				textField
				{...HTMLfieldProps}
			>
				{isMulti ? (
					<div className={styles['content']}>
						<div aria-hidden="true" className={styles['labels']}>
							{renderSelectedValue}
						</div>
						<input ref={mergeInputRef} {...otherProps} {...sharedInputProps} />
					</div>
				) : (
					<input ref={mergeInputRef} {...otherProps} {...sharedInputProps} />
				)}
			</Field>
			<FloatingPortal>
				{isOpen && (
					<ul
						className={classNames(styles['menu'], [menuClassName])}
						ref={mergeOptionListRef}
						id={optionListId}
						style={{
							...floatingStyles,
							zIndex: 1500,
							gridTemplateColumns: `repeat(${cols}, 1fr)`,
						}}
						onMouseDown={(event) => event.preventDefault()}
						onClick={handleClick}
						onMouseMove={handleMouseMove}
						role="listbox"
						aria-labelledby={labelId}
						aria-multiselectable={isMulti ? 'true' : 'false'}
					>
						{renderFilteredOptions}
					</ul>
				)}
			</FloatingPortal>
		</>
	)
}

export const Autocomplete = memo(AutocompleteComponent) as typeof AutocompleteComponent;