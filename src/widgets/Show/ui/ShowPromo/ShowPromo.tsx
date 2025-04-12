import { Typography } from "@/shared/ui/Typography"
import { SoloBadge } from "@/shared/ui/SoloBadge"
import { getRatingBadgeColor } from "@/shared/helpers/getRatingBadgeColor"
import { BookMark, Eye, Play, Star } from "@/shared/assets/icons"
import { classNames } from "@/shared/helpers/classNames"
import { Button } from "@/shared/ui/Button"
import { IconButton } from "@/shared/ui/IconButton"
import { movieMetaDataLabels } from "@/shared/helpers/movieMetaDataLabels"
import { memo } from "react"
import { Badge } from "@/shared/ui/Badge"
import styles from "./style.module.scss"

interface ShowPromoProps {
	title: string
	rating: number
	totalReviews: number
	releaseDate: string
	duration: number
	ageLimit: number
	posterUrl: string
	genres: string[]
	countries: string[]
	entity: "movie" | "series"
}

export const ShowPromo = memo((props: ShowPromoProps) => {
	const {
		title,
		rating,
		totalReviews,
		genres,
		countries,
		releaseDate,
		duration,
		ageLimit,
		entity,
		posterUrl,
	} = props

	return (
		<div className={styles["promo"]}>
			<img src={posterUrl} />
			<div className={classNames(styles["details"])}>
				<Typography
					className={styles["title"]}
					component="h1"
					size="h1"
					color="inherit"
				>
					{title}
				</Typography>
				<Badge
					badgeContent={totalReviews}
					visible
					color="secondary"
					overlap="square"
					aria-label={`Total review ${totalReviews}`}
				>
					<SoloBadge
						aria-label={`${entity === "movie" ? "Movie" : "Series"} rating ${rating}`}
						endIcon={<Star />}
						color={getRatingBadgeColor(rating)}
						size="m"
					>
						{rating}
					</SoloBadge>
				</Badge>
				<div className={styles["meta"]}>
					<span>{movieMetaDataLabels.getReleaseDateLabel(releaseDate)}</span>
					<span>{movieMetaDataLabels.getCountryLabels(countries, 2)}</span>
					<span>{movieMetaDataLabels.getGenreLabels(genres, 2)}</span>
					<span>{movieMetaDataLabels.getDurationLabel(duration, entity)}</span>
					<span>{ageLimit}+</span>
				</div>
				<div className={styles["actions"]}>
					<div className={styles["actions__watch-buttons"]}>
						<Button size="m" color="primary">
							<Play />
							Watch {entity === "movie" ? "movie" : "series"}
						</Button>
						<Button size="m">Watch trailer</Button>
					</div>
					<div className={styles["actions__response-buttons"]}>
						<IconButton borderRadius="m" size="m">
							<BookMark />
						</IconButton>
						<IconButton borderRadius="m" size="m">
							<Eye />
						</IconButton>
						<IconButton borderRadius="m" size="m">
							<Star />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	)
})
