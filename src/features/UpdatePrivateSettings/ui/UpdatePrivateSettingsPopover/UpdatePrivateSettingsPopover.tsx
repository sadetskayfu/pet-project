import { Button } from "@/shared/ui/Button"
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverHeading,
	PopoverProps,
} from "@/shared/ui/Popover"
import { lazy, Suspense, useCallback } from "react"
import { FormSchema } from "../../model/FormSchema"
import { UpdatePrivateSettingsFormSkeleton } from "../UpdatePrivateSettingsForm/UpdatePrivateSettingsFormSkeleton"
import { Typography } from "@/shared/ui/Typography"
import styles from "./style.module.scss"

const Form = lazy(
	() => import("../UpdatePrivateSettingsForm/UpdatePrivateSettingsForm")
)

interface Props extends Omit<PopoverProps, "children"> {
	defaultValues: FormSchema
	popoverId?: string
}

export const UpdatePrivateSettingsPopover = ({
	defaultValues,
	popoverId,
	setOpen,
	...otherProps
}: Props) => {
	const handleClose = useCallback(() => {
		setOpen?.(false)
	}, [setOpen])

	return (
		<Popover modal placement="bottom-end" setOpen={setOpen} {...otherProps}>
			<PopoverContent
				id={popoverId}
				containerClassName={styles["popover"]}
				className={styles["popover__content"]}
			>
				<PopoverHeading>
					<Typography color="hard" size="h5">
						Измените настройки приватности
					</Typography>
				</PopoverHeading>
				<Suspense fallback={<UpdatePrivateSettingsFormSkeleton />}>
					<Form defaultValues={defaultValues} onSuccess={handleClose}>
						<PopoverClose>
							<Button variant="clear">Отмена</Button>
						</PopoverClose>
					</Form>
				</Suspense>
			</PopoverContent>
		</Popover>
	)
}
