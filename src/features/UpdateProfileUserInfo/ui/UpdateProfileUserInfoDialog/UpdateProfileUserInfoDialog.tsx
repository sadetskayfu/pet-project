import { Button } from "@/shared/ui/Button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeading,
	DialogProps,
} from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { lazy, Suspense, useCallback } from "react"
import { FormSchema } from "../../model/FormSchema"
import { UpdateProfileUserInfoFormSkeleton } from "../UpdateProfileUserInfoForm/UpdateProfileUserInfoFormSkeleton"
import styles from "./style.module.scss"

const UpdateProfileUserInfoForm = lazy(
	() => import("../UpdateProfileUserInfoForm/UpdateProfileUserInfoForm")
)

interface UpdateProfileUserInfoDialogProps
	extends Omit<DialogProps, "children"> {
	defaultValues: FormSchema
	id?: string
}

export const UpdateProfileUserInfoDialog = ({
	defaultValues,
	id,
	setOpen,
	...otherProps
}: UpdateProfileUserInfoDialogProps) => {
	const handleClose = useCallback(() => {
		setOpen?.(false)
	}, [setOpen])

	return (
		<Dialog setOpen={setOpen} {...otherProps}>
			<DialogContent
				id={id}
				containerClassName={styles["dialog"]}
				className={styles["dialog__content"]}
			>
				<DialogHeading>
					<Typography textAlign="center" color="hard" size="h4">
						Укажите информацию о себе
					</Typography>
				</DialogHeading>
				<Suspense fallback={<UpdateProfileUserInfoFormSkeleton />}>
					<UpdateProfileUserInfoForm
						defaultValues={defaultValues}
						onSuccess={handleClose}
					>
						<DialogClose>
							<Button variant="clear">Отмена</Button>
						</DialogClose>
					</UpdateProfileUserInfoForm>
				</Suspense>
			</DialogContent>
		</Dialog>
	)
}

