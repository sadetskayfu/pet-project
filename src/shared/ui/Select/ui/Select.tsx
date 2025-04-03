import {
	Field,
	FieldBorderPlacement,
	FieldSize,
	FieldVariant,
	HTMLFieldProps,
} from '@/shared/ui/Field'
import {
	Children,
	cloneElement,
	HTMLAttributes,
	ReactElement,
	ReactNode,
	useCallback,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react'
import { Arrow } from '@/shared/assets/icons'
import { OptionItem, OptionItemProps } from '@/shared/ui/OptionItem'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { useRefValues, useChangeValue, useNavigation } from '../model'
import {
	offset,
	flip,
	size as floatingSize,
	useFloating,
	useDismiss,
	useTypeahead,
	useInteractions,
	autoUpdate,
	FloatingPortal,
	useTransitionStatus,
	Placement,
	useMergeRefs,
} from '@floating-ui/react'
import { useOptions } from '@/shared/lib/select'
import { scrollToItem } from '@/shared/lib/keyboardNavigation'
import { Typography } from '@/shared/ui/Typography'
import { isValueSelected } from '@/shared/helpers/isValueSelected'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import styles from './style.module.scss'

type SelectMenuProps = {
	className?: string
	placement?: Placement
	offset?: number
	flipPadding?: number
	width?: number
	height?: number
	cols?: number
}

type HTMLProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'>

export interface SelectProps<T, V extends string | string[]> extends HTMLProps {
	className?: string
	name?: string
	children: ReactElement[] | ReactElement | null
	options: T[]
	defaultValue?: V
	value?: V
	onChange?: (value: V extends string ? string : string[]) => void
	initialOpen?: boolean
	open?: boolean
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	menuProps?: SelectMenuProps
	label: string
	placeholder?: string
	variant?: FieldVariant
	size?: FieldSize
	borderPlacement?: FieldBorderPlacement
	hiddenLabel?: boolean
	startAdornment?: ReactNode
	actions?: (ReactElement | null)[]
	helperText?: string
	helperTextIds?: string[]
	loading?: boolean
	errored?: boolean
	disabled?: boolean
	readOnly?: boolean
	required?: boolean
	fullWidth?: boolean
	fixedHeight?: boolean
	selectRef?: React.RefObject<HTMLDivElement>
	fieldRef?: React.RefObject<HTMLElement>
	HTMLFieldProps?: HTMLFieldProps
	renderValue?: (option: T, onClose: () => void) => ReactElement
	getOptionDisabled?: (option: T) => boolean
	getOptionValue?: (option: T) => string
	getOptionLabel?: (option: T) => string
}

export const Select = <T, V extends string | string[]>(props: SelectProps<T, V>) => {
	const {
		className,
		name,
		children,
		options,
		defaultValue = '',
		value: controlledValue,
		onChange: controlledOnChange,
		initialOpen = false,
		open: controlledOpen,
		setOpen: setControlledOpen,
		menuProps = {},
		label,
		placeholder,
		variant,
		size = 'm',
		borderPlacement,
		hiddenLabel,
		startAdornment,
		actions = [],
		helperText,
		helperTextIds: externalHelperTextIds = [],
		loading,
		errored,
		disabled,
		readOnly,
		required,
		fullWidth,
		fixedHeight,
		tabIndex = 0,
		HTMLFieldProps = {},
		fieldRef,
		selectRef: externalSelectRef,
		renderValue,
		getOptionDisabled,
		getOptionLabel = (option) => option as string,
		getOptionValue = (option) => option as string,
		onBlur,
		onFocus,
		...otherProps
	} = props

	const { onClick, ...otherHTMLFieldProps } = HTMLFieldProps

	const {
		className: menuClassName,
		placement = 'bottom-start',
		offset: offsetValue = 5,
		flipPadding = 5,
		width,
		height,
		cols = 1,
	} = menuProps

	const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
		defaultValue
	)
	const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(initialOpen)

	const isOpen = controlledOpen ?? uncontrolledOpen
	const setIsOpen = setControlledOpen ?? setUncontrolledOpen
	const value = (controlledValue ?? uncontrolledValue) as string | string[]
	const onChange = (controlledOnChange ?? setUncontrolledValue) as (value: string | string[]) => void

	const isMulti = Array.isArray(value)

	const [isFocused, setIsFocused] = useState<boolean>(false)

	const id = useId()
	const labelId = id + 'label'
	const helperTextId = id + 'helper-text'
	const optionListId = id + 'option-list'
	const optionId = id + 'option'

	const selectRef = useRef<HTMLDivElement>(null)
	const optionListRef = useRef<HTMLUListElement>(null)
	const optionLabelsRef = useRef<(string | null)[]>([])

	const { refs, floatingStyles, context } = useFloating({
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

	const mergeOptionListRef = useMergeRefs([optionListRef, refs.setFloating])

	const { optionsRef, isOptionsReady } = useOptions({
		optionListRef,
		isMounted: isOpen,
		isLoading: loading,
	})

	const recordOptions = useMemo(() => {
		return options.reduce(
			(keys, option) => {
				keys[getOptionValue(option)] = option
				return keys
			},
			{} as Record<string, T>
		)
		// eslint-disable-next-line
	}, [options])

	const helperTextIds = useMemo(() => {
		if (helperText) {
			return [helperTextId, ...externalHelperTextIds]
		} else {
			return externalHelperTextIds
		}
	}, [externalHelperTextIds, helperTextId, helperText])

	const { valueRef, isOpenRef } = useRefValues({
		value,
		isOpen,
	})

	const { handleClick, handleDelete, handleSelect } = useChangeValue({
		valueRef,
		onChange,
		setOpen: setIsOpen,
		required,
	})

	const {
		activeIndexRef,
		activeOptionId,
		handleKeyDown,
		handleMouseMove,
		setActiveOption,
	} = useNavigation({
		isOpen,
		isOpenRef,
		valueRef,
		optionListRef,
		optionsRef,
		isOptionsReady,
		isLoading: loading,
		cols,
		onDelete: handleDelete,
		onSelect: handleSelect,
		setOpen: setIsOpen,
	})

	const dismiss = useDismiss(context)
	const typeahead = useTypeahead(context, {
		listRef: optionLabelsRef,
		activeIndex: activeIndexRef.current,
		onMatch: isOpen
			? (index) => {
					setActiveOption(index)
					scrollToItem(optionsRef.current[index], optionListRef.current!)
				}
			: undefined,
	})

	const { getReferenceProps } = useInteractions([dismiss, typeahead])

	const { isMounted, status } = useTransitionStatus(context, {
		duration: 200,
	})

	const handleBlur = useCallback(
		(event: React.FocusEvent<HTMLElement>) => {
			onBlur?.(event)
			setIsFocused(false)
			setIsOpen(false)
		},
		[onBlur, setIsOpen]
	)

	const handleFocus = useCallback(
		(event: React.FocusEvent<HTMLElement>) => {
			onFocus?.(event)
			setIsFocused(true)
		},
		[onFocus]
	)

	const handleToggleMenu = useCallback(() => {
		setIsOpen((prev) => !prev)
	}, [setIsOpen])

	const renderOptions = useMemo(() => {
		optionLabelsRef.current = []

		if (loading) {
			return (
				<OptionItem
					aria-hidden='true'
					value=""
					readOnly
				>
					Loading...
				</OptionItem>
			)
		}

		if (!children || options.length === 0) {
			return (
				<OptionItem role='alert' value="" readOnly>
					No options
				</OptionItem>
			)
		}

		return Children.map(children, (child, index) => {
			console.log('Render options')

			const optionValue: string | undefined = child.props.value

			if (!optionValue) {
				return cloneElement(child)
			}

			const optionLabel = getOptionLabel(recordOptions[optionValue])

			const isDisabled = getOptionDisabled
				? getOptionDisabled(recordOptions[optionValue])
				: false
			const isSelected = isValueSelected(optionValue, value)

			optionLabelsRef.current.push(isDisabled ? null : optionLabel)

			return cloneElement(child as ReactElement<OptionItemProps>, {
				id: optionId + (index + 1),
				selected: isSelected,
				disabled: isDisabled,
			})
		})
	}, // eslint-disable-next-line
	[
		value,
		children,
		options,
		recordOptions,
		optionId,
		loading,
	])

	const renderSelectedValue = useMemo(() => {
		if (value.length > 0) {
			console.log('Render value')
			if (isMulti) {
				if (renderValue) {
					return value.map((optionValue) => {
						return renderValue(recordOptions[optionValue], () =>
							readOnly ? undefined : handleDelete(optionValue)
						)
					})
				} else {
					const optionsLabel = value.map(
						(optionValue) => getOptionLabel(recordOptions[optionValue])
					)
					return (
						<Typography color="hard" noWrap={fixedHeight ? true : false}>
							{optionsLabel.join(', ')}
						</Typography>
					)
				}
			} else {
				if (renderValue) {
					return renderValue(recordOptions[value], () => {})
				} else {
					return (
						<Typography color="hard" noWrap={fixedHeight ? true : false}>
							{getOptionLabel(recordOptions[value])}
						</Typography>
					)
				}
			}
		}
	}, 
	// eslint-disable-next-line
	[
		value,
		readOnly,
		recordOptions,
		isMulti,
		fixedHeight,
		handleDelete,
	])

	const mods: Mods = {
		[styles['open']]: isOpen,
	}

	const menuMods: Mods = {
		[styles['open']]: status === 'open',
		[styles['close']]: status === 'close',
	}

	return (
		<>
			<Field
				containerClassName={className}
				fieldClassName={classNames(styles['field'], [], mods)}
				ref={useMergeRefs([refs.setReference, fieldRef])}
				label={label}
				labelId={labelId}
				variant={variant}
				size={size}
				borderPlacement={borderPlacement}
				hiddenLabel={hiddenLabel}
				startAdornment={startAdornment}
				helperText={helperText}
				helperTextId={helperTextId}
				required={required}
				disabled={disabled}
				targetFocusRef={selectRef}
				focused={isFocused}
				errored={errored}
				fullWidth={fullWidth}
				onClick={
					readOnly ? undefined : mergeEventHandlers([handleToggleMenu, onClick])
				}
				onMouseDown={(event) => event.preventDefault()}
				actions={useMemo(
					() => [
						loading ? <CircularProgress aria-label='Loading options' color='secondary'/> : null,
						...actions,
						<span className={styles['arrow']}>
							<Arrow size="xxs" direction="bottom" />
						</span>,
					],
					[actions, loading]
				)}
				{...otherHTMLFieldProps}
			>
				<div
					className={styles['select']}
					ref={useMergeRefs([selectRef, externalSelectRef])}
					tabIndex={disabled ? -1 : tabIndex}
					onFocus={handleFocus}
					onBlur={handleBlur}
					role="combobox"
					aria-labelledby={labelId}
					aria-describedby={
						helperTextIds.length > 0 ? helperTextIds.join(' ') : undefined
					}
					aria-readonly={readOnly ? 'true' : undefined}
					aria-required={required ? 'true' : 'false'}
					aria-disabled={disabled ? 'true' : undefined}
					aria-activedescendant={isOpen ? activeOptionId : undefined}
					aria-controls={isOpen ? optionListId : undefined}
					aria-haspopup="listbox"
					aria-expanded={isOpen ? 'true' : 'false'}
					aria-invalid={errored ? 'true' : 'false'}
					{...getReferenceProps({
						onKeyDown: readOnly ? undefined : handleKeyDown,
						...otherProps,
					})}
				>
					{value.length > 0 ? (
						<div aria-hidden="true" className={styles['labels']}>
							{renderSelectedValue}
						</div>
					) : placeholder ? (
						<Typography
							component="span"
							color="soft"
							noWrap
							className={styles['placeholder']}
						>
							{placeholder}
						</Typography>
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
			<FloatingPortal>
				{isMounted && (
					<ul
						id={optionListId}
						className={classNames(styles['menu'], [menuClassName], menuMods)}
						ref={mergeOptionListRef}
						onMouseDown={(event) => event.preventDefault()}
						onClick={handleClick}
						onMouseMove={handleMouseMove}
						role="listbox"
						aria-labelledby={labelId}
						aria-multiselectable={isMulti ? 'true' : 'false'}
						style={{
							...floatingStyles,
							zIndex: 1500,
							gridTemplateColumns: `repeat(${cols}, 1fr)`,
						}}
					>
						{renderOptions}
					</ul>
				)}
			</FloatingPortal>
		</>
	)
}
