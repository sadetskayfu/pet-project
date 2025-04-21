import { DialogClose, DialogContent, DialogHeading } from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { Button } from "@/shared/ui/Button"
import { lazy, memo, Suspense } from "react"
import { ActorFormSkeleton } from "../ActorForms/ActorFormSkeleton"
import styles from "./style.module.scss"

const CreateActorForm = lazy(() => import("../ActorForms/CreateActorForm"))

export const CreateActorDialogContent = memo(() => {
	return (
		<DialogContent
			containerClassName={styles["dialog"]}
			className={styles["dialog__content"]}
		>
			<DialogHeading>
				<Typography textAlign="center" size="h4" color="primary">
					Создайте актера
				</Typography>
			</DialogHeading>
			<Suspense fallback={<ActorFormSkeleton />}>
				<CreateActorForm>
					<DialogClose>
						<Button variant="clear">Отмена</Button>
					</DialogClose>
				</CreateActorForm>
			</Suspense>
		</DialogContent>
	)
})
