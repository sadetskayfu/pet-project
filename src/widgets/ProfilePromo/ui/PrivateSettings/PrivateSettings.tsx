import { UpdatePrivateSettingsPopover, FormSchema } from "@/features/UpdatePrivateSettings"
import { Gear } from "@/shared/assets/icons"
import { IconButton } from "@/shared/ui/IconButton"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { memo, useCallback, useId, useRef, useState } from "react"

const PrivateSettings = memo(({defaultValues}: {defaultValues: FormSchema}) => {
	const [isOpenPopover, setIsOpenPopover] = useState<boolean>(false)

	const popoverId = useId()

	const buttonRef = useRef<HTMLButtonElement>(null)
	const buttonLabel = "Изменить настройки приватности"

	const handleTogglePopover = useCallback(() => {
		setIsOpenPopover((prev) => !prev)
	}, [])

	return (
		<>
			<BaseTooltip label={buttonLabel}>
				<IconButton
					onClick={handleTogglePopover}
					ref={buttonRef}
					aria-label={buttonLabel}
                    aria-controls={isOpenPopover ? popoverId : undefined}
                    aria-expanded={isOpenPopover ? 'true' : 'false'}
					borderRadius="m"
					size="s"
				>
					<Gear />
				</IconButton>
			</BaseTooltip>  
			<UpdatePrivateSettingsPopover
                popoverId={popoverId}
				referenceRef={buttonRef}
				open={isOpenPopover}
				setOpen={setIsOpenPopover}
                modal
                placement="top-end"
                defaultValues={defaultValues}
			/>
		</>
	)
})

export default PrivateSettings
