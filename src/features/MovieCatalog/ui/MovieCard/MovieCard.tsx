import { MovieForCard } from "@/entities/movies/model"
import { MovieCard as BaseMovieCard } from "@/shared/ui/MovieCard"
import { memo, useRef } from "react"
import { IconButton } from "@/shared/ui/IconButton"
import { BookMark, Eye, Star } from "@/shared/assets/icons"
import { CompositeItem } from "@floating-ui/react"
import {
	BaseTooltip,
} from "@/shared/ui/Tooltip"
import { DelayGroup } from "@/shared/ui/DelayGroup"
import { MutationMovieData } from "../MovieCatalogList/MovieCatalogList"
import { classNames } from "@/shared/helpers/classNames"
import { ToggleWatchedBody } from "../../services/useToggleWatched"
import { ToggleWishedBody } from "../../services/useToggleWished"
import { ROUTES } from "@/shared/constants/routes"
import styles from "./style.module.scss"

interface MovieCardProps {
	data: MovieForCard
	onStartReview: (
		data: MutationMovieData,
		buttonRef: React.RefObject<HTMLButtonElement | null>
	) => void
	onToggleWatched: ({ id, title, isWatched }: ToggleWatchedBody) => void
	onToggleWished: ({ id, title, isWished }: ToggleWishedBody) => void
}

export const MovieCard = memo((props: MovieCardProps) => {
	const { data, onStartReview, onToggleWatched, onToggleWished } = props

	const {
		id,
		title,
		cardImgUrl,
		genres,
		countries,
		isRated,
		isWished,
		isWatched,
		type,
		...otherMovieDataProps
	} = data

	const reviewButtonRef = useRef<HTMLButtonElement>(null)

	const watchedButtonLabel = isWatched
		? "Убрать из списка просмотренных"
		: "Добавить в список просмотренных"
	const wishedButtonLabel = isWished
		? "Убрать из списка желаемых"
		: "Добавить в список желаемых"
	const reviewButtonLabel = isRated
		? "У вас уже есть отзыв, перейдите в секцию отзывов, чтобы изменить его"
		: "Оценить"

	const actions = (
		<DelayGroup>
			<BaseTooltip centering maxWidth={300} placement="right" label={reviewButtonLabel}>
				<CompositeItem
					ref={reviewButtonRef}
					render={
						<IconButton
							className={classNames(styles["review-button"], [styles["button"]], {
								[styles["active"]]: isRated,
							})}
							onClick={
								isRated
									? undefined
									: () => onStartReview({ id, title, mediaType: type }, reviewButtonRef)
							}
							aria-label={reviewButtonLabel}
							variant="clear"
							size="xs"
							color="inherit"
							stopPropagation
						>
							<Star />
						</IconButton>
					}
				/>
			</BaseTooltip>
			<BaseTooltip placement="right" label={watchedButtonLabel}>
				<CompositeItem
					render={
						<IconButton
							className={classNames(styles["watched-button"], [styles["button"]], {
								[styles["active"]]: isWatched,
							})}
							onClick={() => onToggleWatched({ id, title, isWatched })}
							aria-label={watchedButtonLabel}
							variant="clear"
							size="xs"
							color="inherit"
							stopPropagation
						>
							<Eye />
						</IconButton>
					}
				/>
			</BaseTooltip>
			<BaseTooltip placement="right" label={wishedButtonLabel}>
				<CompositeItem
					render={
						<IconButton
							className={classNames(styles["wished-button"], [styles["button"]], {
								[styles["active"]]: isWished,
							})}
							onClick={() => onToggleWished({ id, title, isWished })}
							aria-label={wishedButtonLabel}
							variant="clear"
							size="xs"
							color="inherit"
							stopPropagation
						>
							<BookMark />
						</IconButton>
					}
				/>
			</BaseTooltip>
		</DelayGroup>
	)

	return (
		<BaseMovieCard
			to={`${ROUTES.CATALOG}/${id}`}
			src={cardImgUrl}
			genres={genres.map((genre) => genre.name)}
			countries={countries.map((country) => country.label)}
			actions={actions}
			title={title}
			mediaType={type}
			isWatched={isWatched}
			isRated={isRated}
			isWished={isWished}
			{...otherMovieDataProps}
		/>
	)
})
