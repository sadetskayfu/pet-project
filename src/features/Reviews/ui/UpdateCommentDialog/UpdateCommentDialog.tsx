import { Button } from "@/shared/ui/Button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeading,
} from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { FormProvider, useForm } from "react-hook-form"
import {
	updateCommentFormSchema as formSchema,
	UpdateCommentFormSchema as FormSchema,
} from "../../model/UpdateCommentFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { RHFTextArea } from "@/shared/ui/RHFControllers"
import { useUpdateComment } from "../../services/useUpdateComment"
import React, { useCallback, useEffect} from "react"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import styles from "./style.module.scss"

interface UpdateCommentDialogProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	returnFocus: React.RefObject<HTMLElement | null>
	defaultValues: FormSchema
	commentId: number
	reviewId: number
}

const UpdateCommentDialog = (props: UpdateCommentDialogProps) => {
	const { defaultValues, commentId, reviewId, open, setOpen, returnFocus } =
		props

	const methods = useForm<FormSchema>({
		mode: "all",
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	useEffect(() => {
		methods.setValue("message", defaultValues.message)
	}, [defaultValues, methods])

	const handleClose = useCallback(() => {
		setOpen(false)
	}, [setOpen])

	const { updateComment, isPending } = useUpdateComment(reviewId, handleClose)

	const handleUpdate = useCallback(
		(data: FormSchema) => {
			updateComment({ message: data.message, commentId })
		},
		[commentId, updateComment]
	)

	return (
		<Dialog
			open={open}
			setOpen={setOpen}
			returnFocus={returnFocus}
			initialFocus={0}
		>
			<DialogContent
				containerClassName={styles["update-comment-dialog"]}
				className={styles["update-comment-dialog__content"]}
			>
				<DialogHeading>
					<Typography size="h5" color="hard">
						Измените свой комментарий
					</Typography>
				</DialogHeading>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(handleUpdate)}
						className={styles["update-comment-dialog__form"]}
					>
						<RHFTextArea<FormSchema>
							name="message"
							label="Ваш комментарий"
							maxHeight={400}
                            variant="outlined"
                            hiddenLabel
                            placeholder="Введите ваше сообщение"
						/>
						<div className={styles["update-comment-dialog__actions"]}>
							<DialogClose>
								<Button>Отмена</Button>
							</DialogClose>
							<div style={{ position: "relative" }}>
								<Button
									disabled={!methods.formState.isValid || isPending}
									type="submit"
									color="primary"
								>
									Изменить
								</Button>
								{isPending && (
									<CircularProgress absCenter aria-label="Идет изменение комментария" />
								)}
							</div>
						</div>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}

export default UpdateCommentDialog
