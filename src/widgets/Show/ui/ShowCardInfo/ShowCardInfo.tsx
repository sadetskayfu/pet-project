import { Typography } from "@/shared/ui/Typography"
import { movieMetaDataLabels } from "@/shared/helpers/movieMetaDataLabels"
import { memo } from "react"
import styles from "./style.module.scss"

interface ShowCardInfoProps {
	description: string
	countries: string[]
	genres: string[]
	ageLimit: number
	releaseDate: string
	duration: number
	entity: "movie" | "series"
}

export const ShowCardInfo = memo((props: ShowCardInfoProps) => {
	const {
		description,
		genres,
		countries,
		releaseDate,
		ageLimit,
		duration,
		entity,
	} = props

	return (
		<div className={styles["card-info"]}>
			<Typography component="h2" size="h3" color="hard">
				Information about the {entity === "movie" ? "movie" : "series"}
			</Typography>
			<div>
				<Typography component="h3">
					Plot
				</Typography>
				<Typography component="p" color="hard">
					{description}
				</Typography>
			</div>
			<div className={styles["meta"]}>
				<div>
					<Typography component="h3">Country</Typography>
					<span>{movieMetaDataLabels.getCountryLabels(countries)}</span>
				</div>
				<div>
					<Typography component="h3">Genre</Typography>
					<span>{movieMetaDataLabels.getGenreLabels(genres)}</span>
				</div>
				<div>
					<Typography component="h3">Age limit</Typography>
					<span>{ageLimit}+</span>
				</div>
				<div>
					<Typography component="h3">Release date</Typography>
					<span>{movieMetaDataLabels.getReleaseDateLabel(releaseDate)}</span>
				</div>
				<div>
					<Typography component="h3">Duration</Typography>
					<span>{movieMetaDataLabels.getDurationLabel(duration, entity)}</span>
				</div>
			</div>
		</div>
	)
})
