import { UpdateProfilePosterDialog } from "@/features/UpdateProfilePoster"
import { Upload } from "@/shared/assets/icons"
import { IconButton } from "@/shared/ui/IconButton"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { memo, useCallback, useId, useRef, useState } from "react"

const UploadPoster = memo(({ hasPoster }: {hasPoster: boolean}) => {
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

	const dialogId = useId()

	const buttonRef = useRef<HTMLButtonElement>(null)
    const buttonLabel = hasPoster ? "Изменить постер" : "Загрузить постер"

    const handleOpenDialog = useCallback(() => {
        setIsOpenDialog(true)
    }, [])

	return (
		<>
			<BaseTooltip label={buttonLabel}>
				<IconButton
                    aria-label={buttonLabel}
					aria-haspopup="dialog"
					aria-controls={isOpenDialog ? dialogId : undefined}
                    aria-expanded={isOpenDialog ? 'true' : 'false'}
					ref={buttonRef}
                    color="primary"
                    size="s"
                    borderRadius="m"
                    onClick={handleOpenDialog}
				>
                    <Upload />
                </IconButton>
			</BaseTooltip>
			<UpdateProfilePosterDialog
				id={dialogId}
				returnFocus={buttonRef}
				open={isOpenDialog}
				setOpen={setIsOpenDialog}
                hasPoster={hasPoster}
			/>
		</>
	)
})

export default UploadPoster
