import { TextField } from "@/shared/ui/TextField"
import { memo, useCallback, useState } from "react"
import { useCreateGenre } from "../../services/useCreateGenre"
import { Button } from "@/shared/ui/Button"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { classNames } from "@/shared/helpers/classNames"
import { useWindowWidth } from "@/app/providers/windowWidth"
import styles from "./style.module.scss"

interface CreateGenreFieldProps {
    className?: string
	onValidate: (value: string) => string | null
}

export const CreateGenreField = memo((props: CreateGenreFieldProps) => {
	const { className, onValidate } = props

	const [value, setValue] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

    const { windowWidth } = useWindowWidth()

	const clearValue = useCallback(() => {
		setValue("")
	}, [])

	const { createGenre, isPending } = useCreateGenre(clearValue)

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value.trim()

			setError(onValidate(value))
			setValue(value)
		},
		[onValidate]
	)

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (isPending) return

		switch (event.key) {
			case "Enter":
				if (value.length === 0 || error) break

				createGenre(value)
				break
			default:
				break
		}
	}

	return (
		<div className={classNames(styles["create-genre-field"], [className])}>
			<TextField
				className={styles["field"]}
				label="Название жанра"
				placeholder="Введите название жанра"
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				errored={Boolean(error)}
				helperText={error}
				borderPlacement={windowWidth > 580 ? 'left' : 'all'}
				hiddenLabel
				fullWidth
			/>
			<div style={{position: 'relative'}}>
				<Button
					className={styles["create-button"]}
					size="m"
					borderPlacement={windowWidth > 580 ? 'right' : 'all'}
					disabled={isPending || value.length === 0 || Boolean(error)}
					onClick={() => createGenre(value)}
				>
					Создать жанр
				</Button>
                {isPending && <CircularProgress absCenter/>}
			</div>
		</div>
	)
})
