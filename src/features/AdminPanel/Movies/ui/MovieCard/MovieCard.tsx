import { MovieForCard } from "@/entities/movies/model"
import { Edit, Trash } from "@/shared/assets/icons"
import { IconButton } from "@/shared/ui/IconButton"
import { MovieCard as BaseMovieCard } from "@/shared/ui/MovieCard"
import { CompositeItem } from "@floating-ui/react"
import { memo, useMemo, useRef } from "react"

interface MovieCardProps {
	data: MovieForCard
	onEdit: (
		movieId: number,
		movieTitle: string,
		buttonRef: React.RefObject<HTMLButtonElement | null>
	) => void
	onDelete: (
		movieId: number,
		movieTitle: string,
		buttonRef: React.RefObject<HTMLButtonElement | null>
	) => void
}

export const MovieCard = memo((props: MovieCardProps) => {
	const { data, onEdit, onDelete } = props

	const { id, title, genres, countries, cardImgUrl, ...otherData } = data

	const editButtonRef = useRef<HTMLButtonElement>(null)
	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	const actions = useMemo(
		() => [
			<CompositeItem
				key="edit"
				ref={editButtonRef}
				render={
					<IconButton
						aria-label="Изменить фильм"
						variant="clear"
						size="xs"
						aria-haspopup="dialog"
						onClick={() => onEdit(id, title, editButtonRef)}
						color="light"
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
						aria-label="Удалить фильм"
						variant="clear"
						color="red"
						size="xs"
						onClick={() => onDelete(id, title, deleteButtonRef)}
					>
						<Trash />
					</IconButton>
				}
			/>,
		],
		[id, title, onEdit, onDelete]
	)

	return (
		<BaseMovieCard
			src={cardImgUrl}
			genres={genres.map((genre) => genre.name)}
			countries={countries.map((country) => country.code)}
			title={title}
			actions={actions}
			
			{...otherData}
		/>
	)
})
