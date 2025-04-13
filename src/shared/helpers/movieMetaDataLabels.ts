import { getDateLabel } from "./getDateLabel"
import { getSeasonLabel } from "./getSeasonLabel"

export const movieMetaDataLabels = {
	getCountryLabels: (countries: string[], limit?: number) => {
		const countriesWithLimit = limit ? countries.slice(0, limit) : countries
		return countriesWithLimit.join(" • ")
	},
	getGenreLabels: (genres: string[], limit?: number) => {
		const genresWithLimit = limit ? genres.slice(0, limit) : genres
		return genresWithLimit.join(" • ")
	},
	getReleaseDateLabel: getDateLabel,
	getDurationLabel: (duration: number, entity: "movie" | "series") => {
		if (entity === "series") {
			return getSeasonLabel(duration)
		} else {
			const hours = Math.floor(duration / 60)
			const minutes = Math.floor(duration - hours * 60)

			let result = ""

			if (hours > 0) {
				result += `${hours} ч `
			}
			if (minutes > 0 || hours > 0) {
				result += `${minutes} м`
			}

			return result.trim() || "0 м"
		}
	},
}
