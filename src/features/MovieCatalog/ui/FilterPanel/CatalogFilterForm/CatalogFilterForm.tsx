import { FormSchema } from "../../../model/FormSchema"
import {
	Option,
	RHFAutocomplete,
	RHFAutocompleteByValue,
	RHFSelect,
} from "@/shared/ui/RHFControllers"
import { useYearOptions } from "../../../model/useYearOptions"
import { useRatingOptions } from "../../../model/useRatingOptions"
import { useQuery } from "@tanstack/react-query"
import { genreApi } from "@/entities/genres"
import { memo, useMemo, useState } from "react"
import { CountryOptionItem } from "@/shared/ui/OptionItem"
import { sortOptions } from "../../../model/SortOptions"
import { getCountryOptions } from "@/entities/countries"
import { Chip } from "@/shared/ui/Chip"
import { useYearColumns } from "../../../model/useYearColumns"
import { RHFToggleButtonGroup } from "@/shared/ui/RHFControllers/RHFToggleButtonGroup/RHFToggleButtonGroup"
import { mediaTypeOptions } from "@/features/MovieCatalog/model/MediaTypeOptions"
import { Button } from "@/shared/ui/Button"
import { XMark } from "@/shared/assets/icons"
import { useWindowWidth } from "@/app/providers/windowWidth"
import { VIEWPORT } from "@/shared/constants/viewport"
import styles from "./style.module.scss"

interface CatalogFilterFormProps {
	onResetFilters: () => void
	hasFilter: boolean
}

export const CatalogFilterForm = memo((props: CatalogFilterFormProps) => {
	const { onResetFilters, hasFilter } = props

	const [isOpenGenresMenu, setIsOpenGenresMenu] = useState<boolean>(false)

	const { windowWidth } = useWindowWidth()
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
		<div className={styles["filter-group"]}>
			<div className={styles["filter-group__row"]}>
				<RHFAutocomplete<FormSchema, string, boolean>
					name="genres"
					label="Жанры"
					placeholder="Жанры"
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
					fullWidth
					multiple
					hiddenLabel
				/>
				<RHFAutocompleteByValue<FormSchema, boolean>
					name="countries"
					label="Страны"
					placeholder="Страны"
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
					multiple
					fullWidth
					hiddenLabel
				/>
			</div>
			<div className={styles["filter-group__row"]}>
				<RHFSelect<FormSchema, Option, string>
					name="rating"
					label="Рейтинг"
					options={ratingOptions}
					getOptionLabel={(option) => option.label}
					getOptionValue={(option) => option.value}
					fullWidth
					hiddenLabel
					placeholder="Рейтинг"
				/>
				<RHFSelect<FormSchema, string, string>
					name="year"
					label="Год выпуска"
					options={yearOptions}
					menuProps={{ cols: yearColumns }}
					selectVariant="bg"
					placeholder="Год выпуска"
					hiddenLabel
					fullWidth
					centerOptionContent
				/>
				<RHFSelect<FormSchema, Option, string>
					name="sort"
					label="Сортировать"
					options={sortOptions}
					getOptionLabel={(option) => option.label}
					getOptionValue={(option) => option.value}
					required
					fullWidth
					hiddenLabel
				/>
			</div>
			<RHFToggleButtonGroup<FormSchema>
				className={styles["toggle-button-group"]}
				name="mediaType"
				size="m"
				options={mediaTypeOptions}
				orientation={windowWidth > VIEWPORT.MOBILE ? 'horizontal' : 'vertical'}
				stack={windowWidth > VIEWPORT.MOBILE ? true : false}
			/>
			<Button
				disabled={!hasFilter}
				onClick={onResetFilters}
				className={styles["reset-button"]}
				color="red"
				variant="clear"
			>
				Сбросить все фильтры
				<XMark />
			</Button>
		</div>
	)
})
