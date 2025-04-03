import { CheckMark, Plus, XMark } from '@/shared/assets/icons'
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

interface CreateTagFieldProps {
	label: string
	placeholder?: string
	maxInputWidth: number
	minInputWidth?: number
	readonly?: boolean
	onCreate: (value: string) => void
	onValidate?: (value: string) => string | undefined
}

export const CreateTagField = memo((props: CreateTagFieldProps) => {
	const {
		label,
		placeholder,
		maxInputWidth,
		minInputWidth = 150,
		readonly,
		onCreate,
		onValidate,
	} = props

	const [value, setValue] = useState<string>('')
	const [isFocusedInput, setIsFocusedInput] = useState<boolean>(false)
	const [isCreate, setIsCreate] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>(undefined)

	const id = useId()
	const inputId = id + 'input'
	const tooltipId = id + 'tooltip'

	const inputRef = useRef<HTMLInputElement>(null)
	const inputSpanRef = useRef<HTMLSpanElement>(null)
	const createButtonRef = useRef<HTMLButtonElement>(null)

	const toggleTransition = useCallback((isWidthTransition: boolean) => {
		const transition = 'opacity 0.2s, padding-inline 0.4s, box-shadow 0.2s'

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

	const setCreate = useCallback(() => {
		if(readonly) return

		toggleTransition(true)
		setIsCreate(true)
		inputRef.current?.focus()
	}, [toggleTransition, readonly])

	const handleCancel = useCallback(() => {
		toggleTransition(true)
		setError(undefined)
		setIsCreate(false)
		setValue('')
		setTimeout(() => {
			createButtonRef.current?.focus()
		}, 0)
	}, [toggleTransition])

	const handleCreate = useCallback(async () => {
		if (error || value.length === 0) return

		onCreate(value)
		setValue('')

		inputRef.current?.focus()
	}, [error, value, onCreate])

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			switch (event.key) {
				case 'Enter':
					handleCreate()
					break
				case 'Escape':
					handleCancel()
					break
				default:
					break
			}
		},
		[handleCancel, handleCreate]
	)

	useEffect(() => {
		if (inputRef.current && inputSpanRef.current) {
			const inputSpanWidth = inputSpanRef.current.offsetWidth + 1

			if (inputSpanWidth > minInputWidth && inputSpanWidth < maxInputWidth) {
				inputRef.current.style.width = inputSpanWidth / 16 + 'rem'
			}
		}
	}, [value, maxInputWidth, minInputWidth])

	useEffect(() => {
		if (inputRef.current) {
			const input = inputRef.current

			if (isCreate) {
				input.style.width = minInputWidth / 16 + 'rem'
			} else {
				input.style.width = '0px'
			}
		}
	}, [isCreate, minInputWidth])

	const mods: Mods = {
		[styles['create']]: isCreate,
		[styles['error']]: !!error,
	}

	const isOpenTooltip = isCreate && isFocusedInput

	return (
		<Tooltip open={isOpenTooltip} borderRadius='m' id={tooltipId}>
			<TooltipTrigger>
				<div className={classNames(styles['tag-field'], [], mods)}>
					<div aria-hidden={isCreate ? 'false' : 'true'}>
						<label htmlFor={inputId} className="visually-hidden">
							{label}
						</label>
						<input
							className={styles['input']}
							ref={inputRef}
							id={inputId}
							placeholder={placeholder}
							value={value}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							onFocus={() => setIsFocusedInput(true)}
							onBlur={() => setIsFocusedInput(false)}
							readOnly={readonly}
							tabIndex={isCreate ? 0 : -1}
							autoComplete="none"
							autoCorrect="none"
							autoCapitalize="none"
							aria-describedby={tooltipId}
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
							aria-label="Cancel create"
							borderRadius="none"
							onClick={handleCancel}
							size="xs"
							variant="clear"
							tabIndex={-1}
						>
							<XMark />
						</IconButton>
						{isCreate && <Divider style={{ marginInline: '0px' }} component="hr" />}
						<IconButton
							ref={createButtonRef}
							className={styles['create-button']}
							onClick={isCreate ? handleCreate : setCreate}
							size="xs"
							variant="clear"
							tabIndex={isCreate ? -1 : 0}
							aria-label={isCreate ? 'Create' : 'Start creation'}
							disabled={isCreate && (!!error || value.length === 0)}
						>
							{isCreate ? <CheckMark /> : <Plus />}
						</IconButton>
					</div>
				</div>
			</TooltipTrigger>
			<TooltipContent className={styles['tooltip-content']}>
				<Typography size="helper" textAlign="center">
					Enter - create, Escape - cancel
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
