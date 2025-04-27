import {
	ActorCard as BaseActorCard,
	ActorCardProps as BaseActorCardProps,
} from '@/shared/ui/ActorCard'
import { IconButton } from '@/shared/ui/IconButton'
import { Edit, Trash } from '@/shared/assets/icons'
import React, { memo, useMemo, useRef } from 'react'
import { FormSchema } from '../../model/FormSchema'
import { CompositeItem } from '@floating-ui/react'

interface ActorCardProps extends BaseActorCardProps {
	id: number
	onDelete: (
		actorId: number,
		actorData: FormSchema,
		buttonRef: React.RefObject<HTMLButtonElement | null>
	) => void
	onEdit: (
		actorId: number,
		actorData: FormSchema,
		buttonRef: React.RefObject<HTMLButtonElement | null>
	) => void
}

export const ActorCard = memo((props: ActorCardProps) => {
	const {
		onDelete,
		onEdit,
		id,
		firstName,
		lastName,
		photoUrl,
		birthDate,
		...otherProps
	} = props

	const editButtonRef = useRef<HTMLButtonElement>(null)
	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	const actorData: FormSchema = useMemo(
		() => ({
			firstName,
			lastName,
			birthDate,
			photoUrl: photoUrl ?? '',
		}),
		[birthDate, firstName, lastName, photoUrl]
	)

	const actions = useMemo(
		() => [
			<CompositeItem
				key="edit"
				ref={editButtonRef}
				render={
					<IconButton
						borderRadius="s"
						borderPlacement="left"
						variant="clear"
						onClick={() => onEdit(id, actorData, editButtonRef)}
						aria-label="Изменить актера"
						aria-haspopup="dialog"
						size='xs'
					>
						<Edit />
					</IconButton>
				}
			/>,
			<CompositeItem
				key="delete"
				ref={deleteButtonRef}
				render={
					<IconButton
						onClick={() => onDelete(id, actorData, deleteButtonRef)}
						color="red"
						borderRadius="s"
						borderPlacement="right"
						variant="clear"
						aria-label="Удалить актора"
						size='xs'
					>
						<Trash />
					</IconButton>
				}
			/>,
		],
		[actorData, id, onEdit, onDelete]
	)

	return <BaseActorCard {...actorData} {...otherProps} actions={actions} />
})
