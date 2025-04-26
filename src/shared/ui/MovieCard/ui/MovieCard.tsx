import { Link } from "react-router-dom"
import { memo, ReactNode, useId, useMemo } from "react"
import { Typography } from "@/shared/ui/Typography"
import { Avatar } from "@/shared/ui/Avatar"
import { Composite } from "@floating-ui/react"
import { classNames } from "@/shared/helpers/classNames"
import { SoloBadge } from "@/shared/ui/SoloBadge"
import { Star } from "@/shared/assets/icons"
import { getRatingBadgeColor } from "@/shared/helpers/getRatingBadgeColor"
import { movieMetaDataLabels } from "@/shared/helpers/movieMetaDataLabels"
import { MediaType } from "@/entities/movies"
import styles from "./style.module.scss"
import { getFirstLetter } from "@/shared/helpers/formattingString"

export interface MovieCardProps {
	className?: string
	title: string
	genres: string[]
	rating: number
	duration: number
	countries: string[]
	releaseYear: number
	src: string
	ageLimit: number
	actions?: ReactNode
	to?: string
	style?: React.CSSProperties
	state?: any
	mediaType?: MediaType
	isWatched?: boolean
	isWished?: boolean
	isRated?: boolean
	onFocus?: (event: React.FocusEvent<HTMLElement>) => void
}

export const MovieCard = memo((props: MovieCardProps) => {
	const {
		className,
		to,
		title,
		releaseYear,
		genres,
		style,
		state,
		onFocus,
		...otherProps
	} = props

	const labelId = useId()
	const genre = movieMetaDataLabels.getGenreLabels(genres).toLowerCase()

	return (
		<div className={classNames(styles["card"], [className])} style={style}>
			{to ? (
				<Link
					to={to}
					state={state}
					aria-labelledby={labelId}
					className={styles["image-container"]}
					onFocus={onFocus}
				>
					<SharedContent {...otherProps} />
				</Link>
			) : (
				<div
					aria-labelledby={labelId}
					tabIndex={0}
					className={styles["image-container"]}
					onFocus={onFocus}
				>
					<SharedContent {...otherProps} />
				</div>
			)}
			<div className={classNames(styles["description"], ["swiper-no-swiping"])}>
				<Typography
					id={labelId}
					noWrap
					color="hard"
					fontWeight="bold"
					size="default"
				>
					{title}
				</Typography>
				<Typography noWrap color="soft" size="helper">
					{releaseYear}, {genre}
				</Typography>
			</div>
		</div>
	)
})

const SharedContent = memo(
	({
		src,
		countries,
		duration,
		actions,
		rating,
		ageLimit,
		mediaType,
		title,
	}: Partial<MovieCardProps>) => {
		const ratingBadgeColor = useMemo(() => getRatingBadgeColor(rating!), [rating])

		return (
			<>
				<Avatar className={styles["image"]} borderRadius="m" src={src}>
					{getFirstLetter(title)}
				</Avatar>
				<div className={styles["details"]}>
					<Typography color="soft" size="helper">
						{movieMetaDataLabels.getCountryLabels(countries!)}
					</Typography>
					<Typography color="soft" size="helper">
						{movieMetaDataLabels.getDurationLabel(duration!, mediaType!)}
					</Typography>
					{actions && <Composite className={styles["actions"]}>{actions}</Composite>}
				</div>
				<SoloBadge
					className={styles["rating-badge"]}
					aria-label={`Рейтинг ${rating}`}
					color={ratingBadgeColor}
					endIcon={<Star />}
				>
					{rating!}
				</SoloBadge>
				<SoloBadge
					className={styles["age-limit-badge"]}
					color="grey"
					aria-label={`Возрастное ограничение ${ageLimit}`}
				>
					{`${ageLimit}+`}
				</SoloBadge>
			</>
		)
	}
)
