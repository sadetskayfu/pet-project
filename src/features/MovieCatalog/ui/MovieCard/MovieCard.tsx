import { MovieForCard } from "@/entities/movies/model"
import { MovieCard as BaseMovieCard } from "@/shared/ui/MovieCard"
import { memo, useRef } from "react"
import { IconButton } from "@/shared/ui/IconButton"
import { BookMark, Eye, Star } from "@/shared/assets/icons"
import { CompositeItem } from "@floating-ui/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip"
import { Typography } from "@/shared/ui/Typography"
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
		isWished,
		isRated,
		isWatched,
		...otherMovieDataProps
	} = data

	const reviewButtonRef = useRef<HTMLButtonElement>(null)

	const watchedButtonLabel = isWatched
		? "Remove from the watched list"
		: "Add to the watched list"
	const reviewButtonLabel = isRated
		? "You already have a review for the movie. Go to the movie page to edit the review"
		: "Rate the movie"
	const wishedButtonLabel = isWished
		? "Remove from the wished list"
		: "Add to the wished list"

	const actions = (
		<DelayGroup delay={400}>
			<Tooltip placement="right">
				<TooltipTrigger>
					<CompositeItem
						ref={reviewButtonRef}
						render={
							<IconButton
								className={classNames(styles["button"], [], {
									[styles["active"]]: isRated,
								})}
								onClick={
									isRated
										? undefined
										: () => onStartReview({ id, title }, reviewButtonRef)
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
				</TooltipTrigger>
				<TooltipContent maxWidth={300}>
					<Typography size="helper" component="p" color="hard">
						{reviewButtonLabel}
					</Typography>
				</TooltipContent>
			</Tooltip>
			<Tooltip placement="right">
				<TooltipTrigger>
					<CompositeItem
						render={
							<IconButton
								className={classNames(styles["button"], [], {
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
				</TooltipTrigger>
				<TooltipContent maxWidth={300}>
					<Typography size="helper" component="p" color="hard">
						{watchedButtonLabel}
					</Typography>
				</TooltipContent>
			</Tooltip>
			<Tooltip placement="right">
				<TooltipTrigger>
					<CompositeItem
						render={
							<IconButton
								className={classNames(styles["button"], [], {
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
				</TooltipTrigger>
				<TooltipContent maxWidth={300}>
					<Typography size="helper" component="p" color="hard">
						{wishedButtonLabel}
					</Typography>
				</TooltipContent>
			</Tooltip>
		</DelayGroup>
	)

	return (
		<BaseMovieCard
			className={styles["card"]}
			to={`${ROUTES.MOVIES}/${id}`}
			src={cardImgUrl}
			genres={genres.map((genre) => genre.name)}
			countries={countries.map((country) => country.label)}
			actions={actions}
			title={title}
			state={{ from: `${location.pathname}${location.search}` }}
			{...otherMovieDataProps}
		/>
	)
})
