import { Button } from "@/shared/ui/Button"
import { TextArea } from "@/shared/ui/TextArea"
import { useCreateComment } from "../../services/useCreateComment"
import { useCallback } from "react"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import styles from "./style.module.scss"

interface CreateCommentFormProps {
	value: string
	onChange: (value: string) => void
	inputError: string | null
	inputRef: React.ForwardedRef<HTMLTextAreaElement>
	movieId: number
	reviewId: number
	reviewUserName: string
	onCancel: () => void
	onSuccess: () => void
}

export const CreateCommentForm = (props: CreateCommentFormProps) => {
	const {
		value,
		onChange,
		inputError,
		inputRef,
		movieId,
		reviewId,
		reviewUserName,
		onCancel,
		onSuccess,
	} = props

	const { createComment, isPending } = useCreateComment(movieId, onSuccess)

	const handleCreateComment = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		createComment({ message: value, reviewId, reviewUserName })
	}

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === "Escape") {
				onCancel()
			}
		},
		[onCancel]
	)

	return (
		<form
			onKeyDown={handleKeyDown}
			onSubmit={handleCreateComment}
			className={styles["create-comment-form"]}
		>
			<TextArea
				ref={inputRef}
				label="Введите ваше сообщение"
				value={value}
				onChange={onChange}
				errored={Boolean(inputError)}
				helperText={inputError || ""}
				variant="standard"
				placeholder="Введите ваше сообщение"
				hiddenLabel
			/>
			<div className={styles["create-comment-form__buttons"]}>
				<Button variant="clear" onClick={onCancel}>
					Отмена
				</Button>
				<div style={{ position: "relative" }}>
					<Button
						type="submit"
						color="primary"
						disabled={value.length < 1 || isPending || Boolean(inputError)}
					>
						Оставить комментарий
					</Button>
					{isPending && (
						<CircularProgress absCenter aria-label="Создание коментария" />
					)}
				</div>
			</div>
		</form>
	)
}
