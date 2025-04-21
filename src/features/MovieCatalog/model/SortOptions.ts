import { MovieSortValue } from "@/entities/movies"

type SortOption = {
	value: MovieSortValue
	label: string
}

export const sortOptions: SortOption[] = [
	{
		value: 'rating-desc',
		label: 'Сначала высокооцененные',
	},
	{
		value: 'rating-asc',
		label: 'Сначала низкооцененные',
	},
    {
		value: 'releaseYear-desc',
		label: 'Сначала новые',
	},
	{
		value: 'releaseYear-asc',
		label: 'Сначала старые',
	},
]
