import { UpdateUserAvatarDialog } from "@/features/UpdateUserAvatar"
import { Upload } from "@/shared/assets/icons"
import { IconButton } from "@/shared/ui/IconButton"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { memo, useCallback, useId, useRef, useState } from "react"

const UploadAvatar = memo(({
	hasAvatar,
	className,
}: {
	hasAvatar: boolean
	className?: string
}) => {
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

	const dialogId = useId()

	const buttonRef = useRef<HTMLButtonElement>(null)
	const buttonLabel = hasAvatar ? "Изменить аватар" : "Загрузить аватар"

	const handleOpenDialog = useCallback(() => {
		setIsOpenDialog(true)
	}, [])

	return (
		<>
			<BaseTooltip label={buttonLabel}>
				<IconButton
					className={className}
					aria-label={buttonLabel}
					aria-haspopup="dialog"
					aria-controls={isOpenDialog ? dialogId : undefined}
					aria-expanded={isOpenDialog ? "true" : "false"}
					ref={buttonRef}
					onClick={handleOpenDialog}
					color="primary"
					variant="filled"
					size="s"
				>
					<Upload />
				</IconButton>
			</BaseTooltip>
			<UpdateUserAvatarDialog
				id={dialogId}
				returnFocus={buttonRef}
				open={isOpenDialog}
				setOpen={setIsOpenDialog}
				hasAvatar={hasAvatar}
			/>
		</>
	)
})

export default UploadAvatar
