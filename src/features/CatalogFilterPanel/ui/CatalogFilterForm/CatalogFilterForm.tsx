import { FormSchema } from '../../model/FormSchema'
import {
	Option,
	RHFAutocomplete,
	RHFAutocompleteByValue,
	RHFSelect,
} from '@/shared/ui/RHFControllers'
import { useYearOptions } from '../../model/useYearOptions'
import { useRatingOptions } from '../../model/useRatingOptions'
import { useQuery } from '@tanstack/react-query'
import { genreApi } from '@/entities/genres'
import { useMemo, useState } from 'react'
import { CountryOptionItem } from '@/shared/ui/OptionItem'
import { sortOptions } from '../../model/SortOptions'
import { getCountryOptions } from '@/entities/countries'
import { Chip } from '@/shared/ui/Chip'
import { useYearColumns } from '../../model/useYearColumns'
import styles from './style.module.scss'

export const CatalogFilterForm = () => {
	const [isOpenGenresMenu, setIsOpenGenresMenu] = useState<boolean>(false)

	const { yearColumns } = useYearColumns()

	const genresQuery = useQuery({
		...genreApi.getGenresQueryOptions(),
		enabled: isOpenGenresMenu,
	})

	const genreOptions = useMemo(
		() => genresQuery.data?.map((genre) => genre.name),
		[genresQuery.data]
	)
	const countryOptions = useMemo(() => getCountryOptions(), [])

	const { yearOptions } = useYearOptions()
	const { ratingOptions } = useRatingOptions()

	return (
		<div className={styles['filter-group']}>
			<div className={styles['autocompletes']}>
				<RHFAutocomplete<FormSchema, string, boolean>
					name="genres"
					label="Genres"
					placeholder="Input genre name"
					options={genreOptions || []}
					open={isOpenGenresMenu}
					setOpen={setIsOpenGenresMenu}
					renderValue={(option, onDelete) => (
						<Chip
							color="secondary"
							key={option}
							label={option}
							onClose={onDelete}
							tabIndex={-1}
						/>
					)}
					loading={genresQuery.isLoading}
					variant="filled"
					fullWidth
					multiple
				/>
				<RHFAutocompleteByValue<FormSchema, boolean>
					name="countries"
					label="Countries"
					placeholder="Input country name"
					options={countryOptions}
					renderOption={(option, props) => (
						<CountryOptionItem
							key={option.value}
							value={option.value}
							label={option.label}
							{...props}
						/>
					)}
					renderValue={(option, onDelete) => (
						<Chip
							color="secondary"
							key={option.value}
							label={option.label}
							onClose={onDelete}
							tabIndex={-1}
						/>
					)}
					variant="filled"
					multiple
					fullWidth
				/>
			</div>
			<div className={styles['selects']}>
				<RHFSelect<FormSchema, Option, string>
					name="rating"
					label="Rating"
					options={ratingOptions}
					variant="filled"
					getOptionLabel={(option) => option.label}
					getOptionValue={(option) => option.value}
					fullWidth
				/>
				<RHFSelect<FormSchema, string, string>
					name="year"
					label="Year"
					options={yearOptions}
					menuProps={{ cols: yearColumns }}
					selectVariant="bg"
					variant="filled"
					fullWidth
					centerOptionContent
				/>
				<RHFSelect<FormSchema, Option, string>
					name="sort"
					label="Sort by"
					options={sortOptions}
					variant="filled"
					getOptionLabel={(option) => option.label}
					getOptionValue={(option) => option.value}
					fullWidth
				/>
			</div>
		</div>
	)
}
