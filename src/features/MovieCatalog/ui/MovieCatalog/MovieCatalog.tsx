import {
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react"
import { useSearchParams } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { MovieCatalogList } from "../MovieCatalogList/MovieCatalogList"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	ExtendedMediaType,
	MovieInfinityListQueryParams,
	MovieSortValue,
} from "@/entities/movies"
import { useWindowWidth } from "@/app/providers/windowWidth"
import { formSchema, FormSchema } from "../../model/FormSchema"
import { CatalogHeaderSkeleton } from "../FilterPanel/CatalogHeaderSkeleton/CatalogHeaderSkeleton"
import { VIEWPORT } from "@/shared/constants/viewport"
import styles from "./style.module.scss"

const MobileCatalogFilterPanel = lazy(
	() =>
		import("../FilterPanel/MobileCatalogFilterPanel/MobileCatalogFilterPanel")
)
const DesktopCatalogFilterPanel = lazy(
	() =>
		import("../FilterPanel/DesktopCatalogFilterPanel/DesktopCatalogFilterPanel")
)

const resetValues: FormSchema = {
	countries: [],
	genres: [],
	rating: "",
	sort: "releaseYear-desc",
	year: "",
	mediaType: 'all'
}

export const MovieCatalog = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [title, setTitle] = useState<string>(searchParams.get("title") || "")

	const { windowWidth } = useWindowWidth()

	const defaultValues: FormSchema = useMemo(
		() => ({
			year: searchParams.get("year") || "",
			rating: searchParams.get("rating") || "",
			sort: (searchParams.get("sort") as MovieSortValue) || "releaseYear-desc",
			genres: searchParams.get("genres")?.split("+") || [],
			countries: searchParams.get("countries")?.split("+") || [],
			mediaType: searchParams.get('mediaType') as ExtendedMediaType || 'all'
		}),
		// eslint-disable-next-line
		[]
	)

	const methods = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	const year = methods.watch("year")
	const rating = methods.watch("rating")
	const sort = methods.watch("sort")
	const genres = methods.watch("genres")
	const countries = methods.watch("countries")
	const mediaType = methods.watch('mediaType')

	const queryParams: MovieInfinityListQueryParams = {
		...(title && { title }),
		...(year && { year }),
		...(rating && { rating }),
		countries: countries.length > 0 ? countries : undefined,
		genres: genres.length > 0 ? genres : undefined,
		sort: sort ? (sort as MovieSortValue) : undefined,
		mediaType: mediaType !== 'all' ? mediaType : undefined
	}

	const hasFilter = Boolean(
		countries.length > 0 ||
			genres.length > 0 ||
			year !== resetValues.year ||
			rating !== resetValues.rating ||
			sort !== resetValues.sort ||
			mediaType !== resetValues.mediaType
	)

	const updateSearchParams = () => {
		const params = {
			...(title && { title }),
			...(year && { year }),
			...(rating && { rating }),
			...(sort && { sort }),
			...(genres.length > 0 && {
				genres: genres.join("+"),
			}),
			...(countries.length > 0 && {
				countries: countries.join("+"),
			}),
			...(mediaType !== 'all' && { mediaType })
		}
		setSearchParams(params, { replace: true })
	}

	const resetForm = useCallback(() => {
		methods.reset(resetValues)
	}, [methods])

	useEffect(() => {
		updateSearchParams()
		// eslint-disable-next-line
	}, [year, rating, title, sort, genres, countries, mediaType])

	return (
		<div className={styles["movie-catalog"]}>
			<FormProvider {...methods}>
				<Suspense fallback={<CatalogHeaderSkeleton />}>
					{windowWidth <= VIEWPORT.MOBILE ? (
						<MobileCatalogFilterPanel
							searchValue={title}
							onChangeSearchValue={setTitle}
							onResetFilters={resetForm}
							hasFilter={hasFilter}
						/>
					) : (
						<DesktopCatalogFilterPanel
							searchValue={title}
							onChangeSearchValue={setTitle}
							onResetFilters={resetForm}
							hasFilter={hasFilter}
						/>
					)}
				</Suspense>
			</FormProvider>
			<MovieCatalogList mediaType={mediaType} queryParams={queryParams} />
		</div>
	)
}
