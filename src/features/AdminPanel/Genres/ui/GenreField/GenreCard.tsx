import { CheckMark, Edit, Trash, XMark } from "@/shared/assets/icons"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { IconButton } from "@/shared/ui/IconButton"
import { TextField } from "@/shared/ui/TextField"
import { ConfirmationDeleteDialog } from "@/widgets/ConfirmationDeleteDialog"
import { memo, useCallback, useMemo, useRef, useState } from "react"

interface GenreFieldProps {
	id: number
	name: string
	loading?: boolean
	onDelete: (id: number) => void
	onUpdate: ({ id, name }: { id: number; name: string }) => void
	onValidate: (value: string) => string | null
}

export const GenreField = memo((props: GenreFieldProps) => {
	const { id, name, loading, onValidate, onDelete, onUpdate } = props

	const [value, setValue] = useState<string>(name)
	const [error, setError] = useState<string | null>(null)
	const [isReadonly, setIsReadonly] = useState<boolean>(true)
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)

	const inputRef = useRef<HTMLInputElement>(null)
	const editButtonRef = useRef<HTMLButtonElement>(null)
	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value.trim()

			setError(onValidate(value))
			setValue(value)
		},
		[onValidate]
	)

	const startEdit = useCallback(() => {
		setIsReadonly(false)
		inputRef.current?.focus()
	}, [])

	const cancelEdit = useCallback(() => {
		setIsReadonly(true)
		setValue(name)
		setError(null)
		setTimeout(() => {
			editButtonRef.current?.focus()
		}, 0)
	}, [name])

	const startDelete = useCallback(() => {
		setIsOpenDeleteDialog(true)
	}, [])

	const handleDelete = useCallback(() => {
		onDelete(id)
		setIsOpenDeleteDialog(false)
	}, [id, onDelete])

	const handleUpdate = useCallback(() => {
		onUpdate({ id, name: value })
		setIsReadonly(true)
		setTimeout(() => {
			editButtonRef.current?.focus()
		}, 0)
	}, [id, value, onUpdate])

	const handleKeyDown = 
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (loading || isReadonly) return

			switch (event.key) {
				case "Escape":
					cancelEdit()
					break
				case "Enter":
					if (error || value.length === 0 || value === name) {
						break
					}
					handleUpdate()
					break
				default:
					break
			}
		}

	const actions = useMemo(
		() => [
			loading ? <CircularProgress color="secondary" /> : null,
			isReadonly ? (
				<IconButton
					size="xs"
					variant="clear"
					ref={editButtonRef}
					aria-label="Изменить жанр"
					onClick={loading ? undefined : startEdit}
				>
					<Edit />
				</IconButton>
			) : (
				<IconButton
					size="xs"
					tabIndex={-1}
					aria-label="Отмена"
					variant="clear"
					onClick={cancelEdit}
				>
					<XMark />
				</IconButton>
			),
			!isReadonly ? (
				<IconButton
					onClick={handleUpdate}
					size="xs"
					tabIndex={-1}
					aria-label="Изменить жанр"
					variant="clear"
					disabled={Boolean(error || value.length === 0 || value === name)}
				>
					<CheckMark />
				</IconButton>
			) : null,
			<IconButton
				aria-label="Удалить жанр"
				onClick={loading ? undefined : startDelete}
				ref={deleteButtonRef}
				color="red"
				variant="clear"
				size="xs"
			>
				<Trash />
			</IconButton>,
		],
		[
			startDelete,
			cancelEdit,
			startEdit,
			handleUpdate,
			isReadonly,
			loading,
			error,
			name,
			value,
		]
	)

	return (
		<>
			<TextField
				label="Название жанра"
				placeholder="Введите название жанра"
				ref={inputRef}
				helperText={error}
				errored={Boolean(error)}
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				readOnly={isReadonly}
				actions={actions}
				tabIndex={isReadonly ? -1 : 0}
				hiddenLabel
				fullWidth
			/>
			<ConfirmationDeleteDialog
				open={isOpenDeleteDialog}
				setOpen={setIsOpenDeleteDialog}
				title={`Вы уверены, что хотите удалить жанр ${name}?`}
				onDelete={handleDelete}
				returnFocus={deleteButtonRef}
				loading={loading}
			/>
		</>
	)
})
