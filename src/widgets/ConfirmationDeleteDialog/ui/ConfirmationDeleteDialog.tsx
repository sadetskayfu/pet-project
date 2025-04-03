import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeading,
} from '@/shared/ui/Dialog'
import { useCallback, useRef } from 'react'
import { Typography } from '@/shared/ui/Typography'
import { Button } from '@/shared/ui/Button'
import styles from './style.module.scss'

interface ConfirmationDeleteDialogProps {
	title: string
	description?: string
	open: boolean
	returnFocus?: React.RefObject<HTMLElement>
	loading?: boolean
	closeAfterDelete?: boolean
	setOpen: (open: boolean) => void
	onDelete: () => void
}

export const ConfirmationDeleteDialog = (
	props: ConfirmationDeleteDialogProps
) => {
	const { title, description, open, returnFocus, loading, closeAfterDelete = true, setOpen, onDelete } = props

	const cancelButtonRef = useRef<HTMLButtonElement>(null)

	const handleDelete = useCallback(() => {
		onDelete()

		if(closeAfterDelete) {
			setOpen(false)
		}
	}, [onDelete, setOpen, closeAfterDelete])

	return (
		<Dialog
			open={open}
			setOpen={setOpen}
			initialFocus={cancelButtonRef}
			returnFocus={returnFocus}
		>
			<DialogContent className={styles['modal']}>
				<DialogHeading>
					<Typography size="h5" component="h2" color="hard">
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
				<div className={styles['actions']}>
					<DialogClose>
						<Button
							ref={cancelButtonRef}
							size="xs"
							color="secondary"
							variant="outlined"
						>
							Cancel
						</Button>
					</DialogClose>
					<Button disabled={loading} onClick={handleDelete} variant="filled" size="xs" color="red">
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
