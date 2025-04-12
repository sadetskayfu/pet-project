import { DelayGroup } from "@/shared/ui/DelayGroup"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { IconButton } from "@/shared/ui/IconButton"
import { Edit, Trash } from "@/shared/assets/icons"
import { memo, useCallback, useRef } from "react"
import { CompositeItem } from "@floating-ui/react"
import styles from "./style.module.scss"

interface UserActionsProps {
	onEdit: (editButtonRef: React.RefObject<HTMLButtonElement | null>) => void
	onDelete: (deleteButtonRef: React.RefObject<HTMLButtonElement | null>) => void
}

const UserActions = memo((props: UserActionsProps) => {
	const { onEdit, onDelete } = props

	const deleteButtonRef = useRef<HTMLButtonElement>(null)
	const editButtonRef = useRef<HTMLButtonElement>(null)

	const handleEdit = useCallback(() => {
		onEdit(editButtonRef)
	}, [onEdit])

	const handleDelete = useCallback(() => {
		onDelete(deleteButtonRef)
	}, [onDelete])

	return (
		<div className={styles["comment-card__user-actions"]}>
			<DelayGroup>
				<BaseTooltip label="Изменить комментарий">
					<CompositeItem
						ref={editButtonRef}
						render={
							<IconButton
								aria-label="Изменить комментарий"
								onClick={handleEdit}
								aria-haspopup='dialog'
								color="inherit"
								size="s"
								variant="clear"
							>
								<Edit />
							</IconButton>
						}
					/>
				</BaseTooltip>
				<BaseTooltip label="Удалить комментарий">
					<CompositeItem
						ref={deleteButtonRef}
						render={
							<IconButton
								aria-label="Удалить комментарий"
								onClick={handleDelete}
								size="s"
								variant="clear"
								color="red"
								offset="right"
							>
								<Trash />
							</IconButton>
						}
					/>
				</BaseTooltip>
			</DelayGroup>
		</div>
	)
})

export default UserActions
