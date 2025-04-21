import { DialogClose, DialogContent, DialogHeading } from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { Button } from "@/shared/ui/Button"
import { lazy, Suspense } from "react"
import { MovieFormSkeleton } from "../MovieForm/MovieFormSkeleton"
import styles from "./style.module.scss"

const MovieForm = lazy(() => import("../MovieForm/MovieForm"))

export const CreateMovieDialogContent = () => {
	return (
		<DialogContent
			containerClassName={styles["dialog"]}
			className={styles["content"]}
		>
			<DialogHeading>
				<Typography component="h3" size="h5" color="primary">
					Создайте медиа
				</Typography>
			</DialogHeading>
			<Suspense fallback={<MovieFormSkeleton />}>
				<MovieForm>
					<DialogClose>
						<Button variant="clear">Отмена</Button>
					</DialogClose>
				</MovieForm>
			</Suspense>
		</DialogContent>
	)
}
