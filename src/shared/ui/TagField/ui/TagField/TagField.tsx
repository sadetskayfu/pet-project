import { Edit, Save, Trash, XMark } from '@/shared/assets/icons'
import { IconButton } from '@/shared/ui/IconButton'
import {
	ChangeEvent,
	memo,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { Divider } from '@/shared/ui/Divider'
import { Typography } from '@/shared/ui/Typography'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip'
import styles from '../style.module.scss'

export interface TagFieldProps {
	id: number
	defaultValue: string
	label: string
	deleteButtonRef?: React.RefObject<HTMLButtonElement>
	placeholder?: string
	maxInputWidth: number
	minInputWidth?: number
	readonly?: boolean
	onUpdate: (value: string, id: number) => void
	onDelete: (id: number) => void
	onValidate?: (value: string) => string | undefined
}

export const TagField = memo((props: TagFieldProps) => {
	const {
		id: entityId,
		defaultValue,
		label,
		deleteButtonRef,
		placeholder,
		maxInputWidth,
		minInputWidth = 100,
		readonly,
		onUpdate,
		onDelete,
		onValidate,
	} = props

	const [isFocusedInput, setIsFocusedInput] = useState(false)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [value, setValue] = useState<string>(defaultValue)
	const [error, setError] = useState<string | undefined>(undefined)

	const id = useId()
	const inputId = id + 'input'
	const tooltipId = id + 'tooltip'

	const inputRef = useRef<HTMLInputElement>(null)
	const inputSpanRef = useRef<HTMLSpanElement>(null)
	const editButtonRef = useRef<HTMLButtonElement>(null)

	const toggleTransition = useCallback((isWidthTransition: boolean) => {
		const transition = 'box-shadow 0.2s'

		if (inputRef.current) {
			inputRef.current.style.transition = isWidthTransition
				? transition + ', width 0.4s'
				: transition
		}
	}, [])

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if(readonly) return

			toggleTransition(false)

			const inputValue = event.target.value

			if (onValidate) {
				setError(onValidate(inputValue))
			}
			setValue(inputValue)
		},
		[onValidate, toggleTransition, readonly]
	)

	const setEdit = useCallback(() => {
		if(readonly) return

		setIsEdit(true)
		inputRef.current?.focus()
	}, [readonly])

	const handleCancel = useCallback(() => {
		toggleTransition(true)
		setError(undefined)
		setIsEdit(false)
		setValue(defaultValue)
		setTimeout(() => {
			editButtonRef.current?.focus()
		}, 0)
	}, [defaultValue, toggleTransition])

	const handleUpdate = useCallback(() => {
		if (error || value === defaultValue) return

		toggleTransition(true)
		setError(undefined)
		setIsEdit(false)
		onUpdate(value, entityId)
		setTimeout(() => {
			editButtonRef.current?.focus()
		}, 0)
	}, [error, value, defaultValue, entityId, toggleTransition, onUpdate])

	const handleDelete = useCallback(() => {
		if(readonly) return

		onDelete(entityId)
	}, [onDelete, entityId, readonly])

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (!isEdit) return

			switch (event.key) {
				case 'Enter':
					handleUpdate()
					break
				case 'Escape':
					handleCancel()
					break
				default:
					break
			}
		},
		[handleCancel, handleUpdate, isEdit]
	)

	useEffect(() => {
		if (inputRef.current && inputSpanRef.current) {
			const input = inputRef.current
			const inputSpanWidth = inputSpanRef.current.offsetWidth + 1

			if (inputSpanWidth < maxInputWidth) {
				input.style.width = inputSpanWidth / 16 + 'rem'
			} else {
				input.style.width = maxInputWidth / 16 + 'rem'
			}
		}
	}, [value, maxInputWidth, minInputWidth])

	const mods: Mods = {
		[styles['create']]: isEdit,
		[styles['error']]: !!error,
	}

	const isOpenTooltip = isEdit && isFocusedInput

	return (
		<Tooltip open={isOpenTooltip} id={tooltipId} borderRadius="m">
			<TooltipTrigger>
				<div className={classNames(styles['tag-field'], [], mods)}>
					<div>
						<label htmlFor={inputId} className="visually-hidden">
							{label}
						</label>
						<input
							className={classNames(styles['input'], [styles['static-input']])}
							ref={inputRef}
							id={inputId}
							placeholder={placeholder}
							value={value}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							onFocus={() => setIsFocusedInput(true)}
							onBlur={() => setIsFocusedInput(false)}
							tabIndex={isEdit ? 0 : -1}
							readOnly={!isEdit || readonly}
							style={{
								minWidth: minInputWidth / 16 + 'rem',
							}}
							autoComplete="none"
							autoCorrect="none"
							autoCapitalize="none"
							aria-describedby={isOpenTooltip ? tooltipId : undefined}
							aria-invalid={error ? 'true' : 'false'}
						/>
						<span
							aria-hidden="true"
							ref={inputSpanRef}
							className={styles['input-span']}
						>
							{value}
						</span>
					</div>
					<div className={styles['actions']}>
						<IconButton
							className={styles['cancel-button']}
							aria-label="Cancel changes"
							borderRadius="none"
							onClick={handleCancel}
							size="xs"
							variant="clear"
							tabIndex={-1}
						>
							<XMark />
						</IconButton>
						{isEdit && <Divider style={{ marginInline: '0px' }} component="hr" />}
						<IconButton
							ref={editButtonRef}
							className={styles['edit-button']}
							onClick={isEdit ? handleUpdate : setEdit}
							size="xs"
							variant="clear"
							borderRadius="none"
							tabIndex={isEdit ? -1 : 0}
							disabled={isEdit && (!!error || value === defaultValue)}
							aria-label={isEdit ? 'Save changes' : 'Edit'}
						>
							{isEdit ? <Save /> : <Edit />}
						</IconButton>
						<Divider style={{ marginInline: '0px' }} component="hr" />
						<IconButton
							className={styles['delete-button']}
							ref={deleteButtonRef}
							onClick={handleDelete}
							variant="clear"
							borderPlacement="right"
							color="red"
							size="xs"
							aria-label="Delete"
						>
							<Trash />
						</IconButton>
					</div>
				</div>
			</TooltipTrigger>
			<TooltipContent className={styles['tooltip-content']}>
				<Typography size="helper" textAlign="center">
					Enter - update, Escape - cancel
				</Typography>
				{error && (
					<Typography
						color="error"
						component="p"
						role="alert"
						size="helper"
						textAlign="center"
					>
						{error}
					</Typography>
				)}
			</TooltipContent>
		</Tooltip>
	)
})
