import { memo, useCallback } from "react"
import { useUploadAvatar } from "../services/useUploadAvatar"
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
import { useDeleteAvatar } from "../services/useDeleteAvatar"
import styles from "./style.module.scss"

interface UpdateUserAvatarDialogProps extends Omit<DialogProps, "children"> {
	id?: string
	avatar?: string | null
}

const UpdateUserAvatarDialog = memo(
	({ setOpen, id, avatar, ...otherProps }: UpdateUserAvatarDialogProps) => {
		const handleCloseDialog = useCallback(() => {
			setOpen?.(false)
		}, [setOpen])

		const {
			uploadAvatar,
			isPending: isUpdatePending,
			error: updateError,
		} = useUploadAvatar(handleCloseDialog)
		const {
			deleteAvatar,
			isPending: isDeletePending,
			error: deleteError,
		} = useDeleteAvatar(handleCloseDialog)

		const error = updateError || deleteError
		const isPending = isUpdatePending || isDeletePending

		const handleAvatarChange = useCallback(
			(file: File | null) => {
				if (file) {
					const formData = new FormData()

					formData.append("avatar", file)

					uploadAvatar(formData)
				}
			},
			[uploadAvatar]
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
							{avatar
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
						{avatar && (
							<Button
								onClick={() => deleteAvatar()}
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

export default UpdateUserAvatarDialog
