type SortOption = {
	value: 'rating-asc' | 'rating-desc' | 'releaseYear-asc' | 'releaseYear-desc'
	label: string
}

export const sortOptions: SortOption[] = [
	{
		value: 'rating-desc',
		label: 'Rating (descending)',
	},
	{
		value: 'rating-asc',
		label: 'Rating (ascending)',
	},
    {
		value: 'releaseYear-desc',
		label: 'Release year (descending)',
	},
	{
		value: 'releaseYear-asc',
		label: 'Release year (ascending)',
	},
]
