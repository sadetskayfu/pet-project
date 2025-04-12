import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeading,
} from "@/shared/ui/Dialog"
import { useCallback, useRef } from "react"
import { Typography } from "@/shared/ui/Typography"
import { Button } from "@/shared/ui/Button"
import styles from "./style.module.scss"
import { CircularProgress } from "@/shared/ui/CircularProgress"

interface ConfirmationDeleteDialogProps {
	title: string
	description?: string
	open: boolean
	setOpen: (open: boolean) => void
	returnFocus?: React.RefObject<HTMLElement | null> | boolean
	referenceRef?: React.RefObject<HTMLElement | null>
	loading?: boolean
	closeAfterDelete?: boolean
	onDelete: () => void
}

const ConfirmationDeleteDialog = (props: ConfirmationDeleteDialogProps) => {
	const {
		title,
		description,
		open,
		returnFocus,
		referenceRef,
		loading,
		closeAfterDelete,
		setOpen,
		onDelete,
	} = props

	const cancelButtonRef = useRef<HTMLButtonElement>(null)

	const handleDelete = useCallback(() => {
		onDelete()

		if (closeAfterDelete) {
			setOpen(false)
		}
	}, [onDelete, setOpen, closeAfterDelete])

	return (
		<Dialog
			open={open}
			setOpen={setOpen}
			initialFocus={cancelButtonRef}
			returnFocus={returnFocus}
			referenceRef={referenceRef}
		>
			<DialogContent className={styles["modal"]}>
				<DialogHeading>
					<Typography size="h5" color="hard">
						{title}
					</Typography>
				</DialogHeading>
				{description && (
					<DialogDescription>
						<Typography component="p" color="soft">
							{description}
						</Typography>
					</DialogDescription>
				)}
				<div className={styles["actions"]}>
					<DialogClose>
						<Button
							ref={cancelButtonRef}
							size="xs"
							color="secondary"
							variant="outlined"
						>
							Отмена
						</Button>
					</DialogClose>
					<div style={{ position: "relative" }}>
						<Button
							disabled={loading}
							onClick={handleDelete}
							variant="filled"
							size="xs"
							color="red"
						>
							Удалить
						</Button>
						{loading && <CircularProgress absCenter aria-label="Идет удаление" />}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ConfirmationDeleteDialog
