import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import {
	CatalogFilterFormSchema,
	catalogFilterFormSchema,
	CatalogHeaderSkeleton,
	DesktopCatalogFilterPanel,
	MobileCatalogFilterPanel,
} from '@/features/CatalogFilterPanel'
import { MovieCatalogList } from '../MovieCatalogList/MovieCatalogList'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	MovieOrder,
	MovieInfinityListQueryParams,
	MovieSort,
} from '@/entities/movies'
import { useTouchDevice, useWindowWidth } from '@/shared/hooks'
import styles from './style.module.scss'

const resetValues: CatalogFilterFormSchema = {
	countries: [],
	genres: [],
	rating: '',
	sort: '',
	year: '',
}

export const MovieCatalog = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [title, setTitle] = useState<string>(searchParams.get('title') || '')

	const { isTouchDevice } = useTouchDevice()
	const { windowWidth } = useWindowWidth()

	const defaultValues: CatalogFilterFormSchema = useMemo(
		() => ({
			year: searchParams.get('year') || '',
			rating: searchParams.get('rating') || '',
			sort: searchParams.get('sort') || '',
			genres: searchParams.get('genres')?.split('+') || [],
			countries: searchParams.get('countries')?.split('+') || [],
		}),
		// eslint-disable-next-line
		[]
	)

	const methods = useForm<CatalogFilterFormSchema>({
		resolver: zodResolver(catalogFilterFormSchema),
		defaultValues,
	})

	const year = methods.watch('year')
	const rating = methods.watch('rating')
	const sort = methods.watch('sort')
	const genres = methods.watch('genres')
	const countries = methods.watch('countries')

	const queryParams: MovieInfinityListQueryParams = {
		...(title && { title }),
		...(year && { year }),
		...(rating && { rating }),
		countries: countries.length > 0 ? countries : undefined,
		genres: genres.length > 0 ? genres : undefined,
		sort: sort ? (sort.split('-')[0] as MovieSort) : undefined,
		order: sort ? (sort.split('-')[1] as MovieOrder) : undefined,
	}

	const hasFilter = Boolean(
			countries.length > 0 ||
			genres.length > 0 ||
			year !== resetValues.year ||
			rating !== resetValues.rating ||
			sort !== resetValues.sort
	)

	const updateSearchParams = () => {
		const params = {
			...(title && { title }),
			...(year && { year }),
			...(rating && { rating }),
			...(sort && { sort }),
			...(genres.length > 0 && {
				genres: genres.join('+'),
			}),
			...(countries.length > 0 && {
				countries: countries.join('+'),
			}),
		}
		setSearchParams(params)
	}

	useEffect(() => {
		updateSearchParams()
	// eslint-disable-next-line
	}, [year, rating, title, sort, genres, countries])

	return (
		<section className={styles['movie-catalog']}>
			<FormProvider {...methods}>
				<Suspense fallback={<CatalogHeaderSkeleton />}>
					{isTouchDevice || windowWidth <= 768 ? (
						<MobileCatalogFilterPanel
							searchValue={title}
							onChangeSearchValue={setTitle}
							onResetFilters={() => methods.reset(resetValues)}
							hasFilter={hasFilter}
							entity="movie"
						/>
					) : (
						<DesktopCatalogFilterPanel
							searchValue={title}
							onChangeSearchValue={setTitle}
							onResetFilters={() => methods.reset(resetValues)}
							hasFilter={hasFilter}
							entity="movie"
						/>
					)}
				</Suspense>
			</FormProvider>
			<MovieCatalogList className={styles['list']} queryParams={queryParams} />
		</section>
	)
}
