import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeading,
	DialogProps,
} from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { Button } from "@/shared/ui/Button"
import { FormSchema } from "../../model/FormSchema"
import { lazy, Suspense, useCallback } from "react"
import { ActorFormSkeleton } from "../ActorForms/ActorFormSkeleton"
import styles from "./style.module.scss"

const UpdateActorForm = lazy(() => import("../ActorForms/UpdateActorForm"))

type BaseDialogProps = Omit<DialogProps, "children">

interface UpdateActorDialogProps extends BaseDialogProps {
	actorId: number
	defaultFormValues: FormSchema
}

export const UpdateActorDialog = (props: UpdateActorDialogProps) => {
	const { setOpen, actorId, defaultFormValues, ...otherProps } = props

	const handleCloseDialog = useCallback(() => {
		setOpen?.(false)
	}, [setOpen])

	return (
		<Dialog {...otherProps} setOpen={setOpen}>
			<DialogContent
				containerClassName={styles["dialog"]}
				className={styles["dialog__content"]}
			>
				<DialogHeading>
					<Typography textAlign="center" size="h4" color="primary">
						Измените актера {defaultFormValues.firstName} {defaultFormValues.lastName}
					</Typography>
				</DialogHeading>
				<Suspense fallback={<ActorFormSkeleton />}>
					<UpdateActorForm
						onCloseDialog={handleCloseDialog}
						actorId={actorId}
						defaultValues={defaultFormValues}
					>
						<DialogClose>
							<Button variant="clear">Отмена</Button>
						</DialogClose>
					</UpdateActorForm>
				</Suspense>
			</DialogContent>
		</Dialog>
	)
}
