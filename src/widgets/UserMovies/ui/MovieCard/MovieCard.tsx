import { MovieForCard } from "@/entities/movies/model"
import { Trash } from "@/shared/assets/icons"
import { ROUTES } from "@/shared/constants/routes"
import { IconButton } from "@/shared/ui/IconButton"
import { MovieCard as BaseMovieCard } from "@/shared/ui/MovieCard"
import React, { memo, useRef } from "react"
import { MutationMovieData } from "../../model/MutationMovieData"
import { BaseTooltip } from "@/shared/ui/Tooltip"

interface MovieCardProps {
    className?: string
	data: MovieForCard
	isMe?: boolean
	isWatchedList?: boolean
	onDelete?: (
		data: MutationMovieData,
		deleteButtonRef: React.RefObject<HTMLButtonElement | null>
	) => void
}

export const MovieCard = memo((props: MovieCardProps) => {
	const { className, data, isMe, isWatchedList, onDelete } = props

	const { genres, countries, id, title, type, cardImgUrl, ...otherData } = data

	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	const deleteButtonLabel = isWatchedList
		? "Удалить из списка просмотренных"
		: "Удалить из списка желаемых"

	return (
		<BaseMovieCard
			{...otherData}
            className={className}
			genres={genres.map((genre) => genre.name)}
			countries={countries.map((country) => country.label)}
			to={`${ROUTES.CATALOG}/${id}`}
			mediaType={type}
			src={cardImgUrl}
			title={title}
			actions={
				isMe ? (
					<BaseTooltip label={deleteButtonLabel}>
						<IconButton
							onClick={() => onDelete?.({ id, title }, deleteButtonRef)}
							ref={deleteButtonRef}
							color="red"
							aria-label={deleteButtonLabel}
							stopPropagation
							size="xs"
							variant="clear"
							borderRadius="s"
						>
							<Trash />
						</IconButton>
					</BaseTooltip>
				) : undefined
			}
		/>
	)
})
