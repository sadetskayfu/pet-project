import { FormProvider, useForm } from "react-hook-form"
import { formSchema, FormSchema } from "../../model/FormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { getCountryOptions } from "@/entities/countries"
import {
	RHFNumberField,
	RHFAutocomplete,
	RHFTextField,
	RHFDatePicker,
	RHFTextArea,
	RHFAutocompleteByValue,
	RHFToggleButtonGroup
} from "@/shared/ui/RHFControllers"
import { ReactElement, useId, useMemo, useState } from "react"
import { Button } from "@/shared/ui/Button"
import { CountryOptionItem } from "@/shared/ui/OptionItem"
import { Genre, genreApi } from "@/entities/genres"
import { Chip } from "@/shared/ui/Chip"
import { useCreateMovie } from "../../services/useCreateMovie"
import { CreateMovieActorBody, CreateMovieBody, MediaType } from "@/entities/movies"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { useUpdateMovie } from "../../services/useUpdateMovie"
import { Tabs } from "@/shared/ui/Tabs"
import { Tab } from "@/shared/ui/Tab"
import { ActorTabPanel } from "./ActorTabPanel/ActorTabPanel"
import styles from "./style.module.scss"

export type ActorPanelValue = "actors" | "directors" | "writers"

type ActorPanel = {
	value: ActorPanelValue
	label: string
}

type MediaOption = {
	value: MediaType
	label: string
}

const actorPanels: ActorPanel[] = [
	{
		value: "actors",
		label: "Актеры",
	},
	{
		value: "directors",
		label: "Режиссеры",
	},
	{
		value: "writers",
		label: "Сценаристы",
	},
]

interface MovieFormProps {
	movieId?: number
	defaultValues?: FormSchema
	onSuccess?: () => void
	children: ReactElement
}

const MovieForm = (props: MovieFormProps) => {
	const { movieId, onSuccess, defaultValues, children } = props

	const [activeActorPanel, setActiveActorPanel] =
		useState<ActorPanelValue>("actors")
	const [isOpenGenresMenu, setIsOpenGenresMenu] = useState<boolean>(false)

	const id = useId()
	const errorAlertId = id + "error-alert"

	const methods = useForm<FormSchema>({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues || {
			title: "",
			description: "",
			duration: "",
			ageLimit: "",
			releaseDate: "",
			actors: [],
			directors: [],
			writers: [],
			genres: [],
			countries: [],
			cardImgUrl: "",
			posterUrl: "",
			type: "movie",
		},
	})

	const countryOptions = useMemo(() => getCountryOptions(), [])

	const genresQuery = useQuery({
		...genreApi.getGenresQueryOptions(),
		enabled: isOpenGenresMenu,
	})

	const {
		createMovie,
		error: createError,
		isPending: isCreatePending,
	} = useCreateMovie(methods.reset)
	const {
		updateMovie,
		error: updateError,
		isPending: isUpdatePending,
	} = useUpdateMovie(onSuccess)

	const error = createError || updateError
	const isPending = isCreatePending || isUpdatePending

	const handleMutate = (formData: FormSchema) => {
		const actors: CreateMovieActorBody[] = formData.actors.map((actor) => ({id: actor.id, role: 'actor'}))
		const writers: CreateMovieActorBody[] = formData.writers.map((writer) => ({id: writer.id, role: 'writer'}))
		const directors: CreateMovieActorBody[] = formData.directors.map((director) => ({id: director.id, role: 'director'}))
		const genres = formData.genres.map((genre) => genre.id)
		const countries = formData.countries
		const ageLimit = Number(formData.ageLimit)
		const duration = Number(formData.duration)

		const movieBody: CreateMovieBody = {
			...formData,
			actors: [...actors, ...writers, ...directors],
			genres,
			countries,
			ageLimit,
			duration,
		}

		if (movieId) {
			updateMovie({ id: movieId, body: movieBody })
		} else {
			createMovie(movieBody)
		}
	}

	const mediaType = methods.watch("type")

	const mediaTypeOptions: MediaOption[] = useMemo(
		() => [
			{ value: "movie", label: "Фильм" },
			{ value: "series", label: "Сериал" },
			{ value: "animated_film", label: "Мультфильм" },
		],
		[]
	)

	const renderActorTabs = useMemo(() => {
		return actorPanels.map((panel) => (
			<Tab
				key={panel.value}
				label={panel.label}
				panelId={id + panel.value + "panel"}
				id={id + panel.value + "tab"}
				value={panel.value}
				size="s"
			/>
		))
	}, [id])

	const renderActorPanels = useMemo(() => {
		return actorPanels.map((panel) => (
			<ActorTabPanel
				key={panel.value}
				panelValue={panel.value}
				labelId={id + panel.value + "tab"}
				panelId={id + panel.value + "panel"}
				inputLabel={panel.label}
				isActive={panel.value === activeActorPanel}
			/>
		))
	}, [id, activeActorPanel])

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(handleMutate)}
				className={styles["form"]}
				aria-description={error ? errorAlertId : undefined}
				noValidate
			>
				<ErrorAlert
					error={error}
					message={`Ошибка при ${movieId ? "изменении" : "создании"} медиа`}
				/>
				<RHFToggleButtonGroup
					className={styles["toggle-button-group"]}
					name="type"
					size="s"
					options={mediaTypeOptions}
				/>
				<div className={styles["fields"]}>
					<RHFTextField<FormSchema>
						name="title"
						label="Название"
						required
						fullWidth
					/>
					<RHFAutocompleteByValue<FormSchema, boolean>
						name="countries"
						label="Страна"
						placeholder="Введите название страны"
						options={countryOptions}
						renderOption={(option, props) => (
							<CountryOptionItem
								key={option.value}
								value={option.value}
								label={option.label}
								showCode
								{...props}
							/>
						)}
						renderValue={(option, onDelete) => (
							<Chip
								color="secondary"
								key={option.value}
								label={option.label}
								tabIndex={-1}
								onClose={onDelete}
							/>
						)}
						menuProps={{
							height: 400,
						}}
						required
						fullWidth
						multiple
					/>
					<RHFNumberField<FormSchema>
						name="ageLimit"
						label="Возр. ограничение"
						min={0}
						max={24}
						required
					/>
					<RHFNumberField<FormSchema>
						name="duration"
						label="Длительность"
						startAdornment={mediaType === "series" ? "сезонов" : "минут"}
						min={0}
						required
					/>
					<RHFDatePicker<FormSchema>
						name="releaseDate"
						label="Дата выхода"
						required
						fullWidth
					/>
					<RHFAutocomplete<FormSchema, Genre, boolean>
						name="genres"
						label="Жанры"
						placeholder="Введите название жанра"
						options={genresQuery.data || []}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => String(option.id)}
						open={isOpenGenresMenu}
						setOpen={setIsOpenGenresMenu}
						loading={genresQuery.isLoading}
						renderValue={(option, onDelete) => (
							<Chip
								color="secondary"
								key={option.id}
								label={option.name}
								tabIndex={-1}
								onClose={onDelete}
							/>
						)}
						menuProps={{
							height: 400,
						}}
						multiple
						required
						fullWidth
					/>
					<div className={styles["actors"]}>
						<Tabs className={styles['actors__tabs']} value={activeActorPanel} onChange={setActiveActorPanel}>
							{renderActorTabs}
						</Tabs>
						{renderActorPanels}
					</div>
					<RHFTextField<FormSchema>
						name="cardImgUrl"
						label="Урл карточки"
						required
						fullWidth
					/>
					<RHFTextField<FormSchema>
						name="posterUrl"
						label="Урл постера"
						required
						fullWidth
					/>
					<RHFTextArea<FormSchema>
						name="description"
						label="Описание"
						className={styles["description-field"]}
						required
						fullWidth
						rows={2}
					/>
				</div>
				<div className={styles["actions"]}>
					{children}
					<div style={{ position: "relative" }}>
						<Button
							disabled={!methods.formState.isValid || isPending}
							color="primary"
							type="submit"
						>
							{movieId ? "Изменить медиа" : "Создать медиа"}
						</Button>
						{isPending && <CircularProgress aria-label="Создание медиа" absCenter />}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}

export default MovieForm
