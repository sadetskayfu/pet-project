import { Edit, Trash } from '@/shared/assets/icons'
import { IconButton } from '@/shared/ui/IconButton'
import {
	MovieCard as BaseMovieCard,
	MovieCardProps as BaseMovieCardProps,
} from '@/shared/ui/MovieCard'
import { CompositeItem } from '@floating-ui/react'
import { memo, useMemo, useRef } from 'react'

interface MovieCardProps extends BaseMovieCardProps {
	id: number
	onEdit: (
		movieId: number,
		buttonRef: React.RefObject<HTMLButtonElement>
	) => void
	onDelete: (
		movieId: number,
		movieTitle: string,
		buttonRef: React.RefObject<HTMLButtonElement>
	) => void
}

export const MovieCard = memo((props: MovieCardProps) => {
	const { id, title, onEdit, onDelete, ...otherProps } = props

	const editButtonRef = useRef<HTMLButtonElement>(null)
	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	const actions = useMemo(
		() => [
			<CompositeItem
                key="edit"
				ref={editButtonRef}
				render={
					<IconButton
						aria-label="Edit movie"
						variant="clear"
						size="xs"
						borderRadius="s"
						borderPlacement="left"
						aria-haspopup="dialog"
						onClick={() => onEdit(id, editButtonRef)}
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
						aria-label="Delete movie"
						variant="clear"
						color="red"
						size="xs"
						borderRadius="s"
						borderPlacement="right"
						onClick={() => onDelete(id, title, deleteButtonRef)}
					>
						<Trash />
					</IconButton>
				}
			/>,
		],
		[id, title, onEdit, onDelete]
	)

	return <BaseMovieCard title={title} actions={actions} {...otherProps} />
})
