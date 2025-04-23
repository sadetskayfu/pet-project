import {
	UpdateProfileUserInfoDialog,
	FormSchema,
} from "@/features/UpdateProfileUserInfo"
import { Edit } from "@/shared/assets/icons"
import { IconButton } from "@/shared/ui/IconButton"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { memo, useCallback, useId, useRef, useState } from "react"

const UpdateUserInfo = memo(
	({ defaultValues }: { defaultValues: FormSchema }) => {
		const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
		const dialogId = useId()

		const buttonRef = useRef<HTMLButtonElement>(null)

		const handleOpenDialog = useCallback(() => {
			setIsOpenDialog(true)
		}, [])

		return (
			<>
				<BaseTooltip label="Изменить информацию о себе">
					<IconButton
						onClick={handleOpenDialog}
						ref={buttonRef}
						aria-label="Изменить информацию о себе"
						aria-controls={isOpenDialog ? dialogId : undefined}
						aria-expanded={isOpenDialog ? "true" : "false"}
						aria-haspopup="dialog"
						borderRadius="m"
						size="s"
						variant="clear"
					>
						<Edit />
					</IconButton>
				</BaseTooltip>
				<UpdateProfileUserInfoDialog
					id={dialogId}
					open={isOpenDialog}
					setOpen={setIsOpenDialog}
					returnFocus={buttonRef}
					defaultValues={defaultValues}
				/>
			</>
		)
	}
)

export default UpdateUserInfo
