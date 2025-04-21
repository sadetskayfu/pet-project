import { ExtendedMediaType } from "@/entities/movies"

type MediaTypeOption = {
	value: ExtendedMediaType
	label: string
}

export const mediaTypeOptions: MediaTypeOption[] = [
	{
		value: 'all',
		label: 'Все'
	},
	{
		value: "movie",
		label: "Фильмы",
	},
	{
		value: "series",
		label: "Сериалы",
	},
	{
		value: "animated_film",
		label: "Мультфильмы",
	},
]