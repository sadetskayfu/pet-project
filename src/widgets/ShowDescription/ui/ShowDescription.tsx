import { Typography } from "@/shared/ui/Typography"
import { movieMetaDataLabels } from "@/shared/helpers/movieMetaDataLabels"
import { memo } from "react"
import { classNames } from "@/shared/helpers/classNames"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import styles from "./style.module.scss"

interface ShowDescriptionProps {
	description: string
	countries: string[]
	genres: string[]
	ageLimit: number
	releaseDate: string
	duration: number
	entity: "movie" | "series"
}

export const ShowDescription = memo((props: ShowDescriptionProps) => {
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
		<div className={classNames(styles["description"], ['section'])}>
			<SectionTitle label={`Информация о ${entity === "movie" ? "фильме" : "сериале"}`}/>
			<div>
				<Typography component="h3">
					Описание
				</Typography>
				<Typography component="p" color="hard">
					{description}
				</Typography>
			</div>
			<div className={styles["meta"]}>
				<div>
					<Typography component="h3">Страна</Typography>
					<span>{movieMetaDataLabels.getCountryLabels(countries)}</span>
				</div>
				<div>
					<Typography component="h3">Жанр</Typography>
					<span>{movieMetaDataLabels.getGenreLabels(genres)}</span>
				</div>
				<div>
					<Typography component="h3">Возрастное ограничение</Typography>
					<span>{ageLimit}+</span>
				</div>
				<div>
					<Typography component="h3">Дата выхода</Typography>
					<span>{movieMetaDataLabels.getReleaseDateLabel(releaseDate)}</span>
				</div>
				<div>
					<Typography component="h3">Длительность</Typography>
					<span>{movieMetaDataLabels.getDurationLabel(duration, entity)}</span>
				</div>
			</div>
		</div>
	)
})
