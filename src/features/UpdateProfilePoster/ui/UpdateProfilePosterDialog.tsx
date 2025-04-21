import { memo, useCallback } from "react"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeading,
	DialogProps,
} from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { ImageUpload } from "@/shared/ui/FileUpload"
import { Button } from "@/shared/ui/Button"
import { IconButton } from "@/shared/ui/IconButton"
import { XMark } from "@/shared/assets/icons"
import { useUploadPoster } from "../services/useUploadPoster"
import { useDeletePoster } from "../services/useDeletePoster"
import styles from "./style.module.scss"

interface UpdateProfilePosterDialogProps extends Omit<DialogProps, "children"> {
	id?: string
	poster?: string | null
}

const UpdateProfilePosterDialog = memo(
	({ setOpen, id, poster, ...otherProps }: UpdateProfilePosterDialogProps) => {
		const handleCloseDialog = useCallback(() => {
			setOpen?.(false)
		}, [setOpen])

		const {
			uploadPoster,
			isPending: isUpdatePending,
			error: updateError,
		} = useUploadPoster(handleCloseDialog)
		const {
			deletePoster,
			isPending: isDeletePending,
			error: deleteError,
		} = useDeletePoster(handleCloseDialog)

		const error = updateError || deleteError
		const isPending = isUpdatePending || isDeletePending

		const handleAvatarChange = useCallback(
			(file: File | null) => {
				if (file) {
					const formData = new FormData()

					formData.append("poster", file)

					uploadPoster(formData)
				}
			},
			[uploadPoster]
		)

		return (
			<Dialog setOpen={setOpen} {...otherProps}>
				<DialogContent
					id={id}
					containerClassName={styles["dialog"]}
					className={styles["content"]}
				>
					<DialogHeading>
						<Typography className={styles["title"]} color="hard" size="h4">
							{poster
								? "Выбирите новое изображение или удалите текущее"
								: "Выберите изображение"}
						</Typography>
					</DialogHeading>
					<ErrorAlert
						fullWidth
						error={error}
						message={
							updateError
								? "Не удалось загружить изображение"
								: "Не удалось удалить изображение"
						}
					/>
					<DialogDescription>
						<Typography>
							Вы можете загрузить изображение в формате JPG или PNG
						</Typography>
					</DialogDescription>
					<div className={styles["actions"]}>
						{poster && (
							<Button
								onClick={() => deletePoster()}
								disabled={isPending}
								loading={isDeletePending}
								color="red"
								variant="outlined"
							>
								Удалить изображение
							</Button>
						)}
						<ImageUpload onChange={handleAvatarChange}>
							<Button
								className={styles["upload-button"]}
								loading={isUpdatePending}
								disabled={isPending}
                                variant="outlined"
							>
								Выбрать изображение
							</Button>
						</ImageUpload>
					</div>
					<DialogClose>
						<IconButton
							className={styles["close-button"]}
							borderRadius="m"
							variant="clear"
							size="s"
						>
							<XMark />
						</IconButton>
					</DialogClose>
				</DialogContent>
			</Dialog>
		)
	}
)

export default UpdateProfilePosterDialog
