import { FormProvider, useForm } from 'react-hook-form'
import { formSchema, FormSchema } from '../../model/FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { getCountryOptions} from '@/entities/countries'
import {
	RHFNumberField,
	RHFAutocomplete,
	RHFTextField,
	RHFDatePicker,
	RHFTextArea,
	RHFAutocompleteByValue,
} from '@/shared/ui/RHFControllers'
import { ReactElement, useCallback, useId, useMemo, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { ActorOptionItem, CountryOptionItem } from '@/shared/ui/OptionItem'
import { Genre, genreApi } from '@/entities/genres'
import { Chip } from '@/shared/ui/Chip'
import { actorApi } from '@/entities/actors'
import { Actor } from '@/entities/actors/model/Actor'
import { useDebounce } from '@/shared/hooks'
import { Avatar } from '@/shared/ui/Avatar'
import { getFirstLetter } from '@/shared/helpers/formattingString'
import { useCreateMovie } from '../../model/useCreateMovie'
import { CreateMovieBody } from '@/entities/movies'
import { Alert } from '@/shared/ui/Alert'
import { XMark } from '@/shared/assets/icons'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import styles from './style.module.scss'

export const CreateMovieForm = ({ children }: { children: ReactElement }) => {
	const [isOpenGenresMenu, setIsOpenGenresMenu] = useState<boolean>(false)
	const [actorsInputValue, setActorsInputValue] = useState<string>('')
	const [debounceActorsInputValue, setDebounceActorsInputValue] =
		useState<string>('')

	const errorAlertId = useId()

	const methods = useForm<FormSchema>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			duration: '',
			ageLimit: '',
			releaseDate: '',
			actors: [],
			genres: [],
			countries: [],
			cardImgUrl: '',
			videoUrl: '',
		},
	})

	const countryOptions = useMemo(() => getCountryOptions(), [])

	const genresQuery = useQuery({
		...genreApi.getGenresQueryOptions(),
		enabled: isOpenGenresMenu,
	})
	const actorsQuery = useQuery({
		...actorApi.getActorsQueryOptions({
			name: debounceActorsInputValue,
			limit: 20,
		}),
		enabled: debounceActorsInputValue.length > 0,
	})

	const { createMovie, error, isPending } = useCreateMovie(() => undefined)

	const onChangeDebounceActorsInputValue = useDebounce<(value: string) => void>(
		setDebounceActorsInputValue,
		300
	)

	const handleChangeActorsInputValue = useCallback(
		(value: string) => {
			setActorsInputValue(value)
			onChangeDebounceActorsInputValue(value)
		},
		[onChangeDebounceActorsInputValue]
	)

	const handleCreateMovie = (formData: FormSchema) => {
		const actors = formData.actors.map((actor) => actor.id)
		const genres = formData.genres.map((genre) => genre.id)
		const countries = formData.countries
		const ageLimit = Number(formData.ageLimit)
		const duration = Number(formData.duration)

		const movieBody: CreateMovieBody = {
			...formData,
			actors,
			genres,
			countries,
			ageLimit,
			duration,
		}

		createMovie(movieBody)
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(handleCreateMovie)}
				className={styles['form']}
				aria-description={error ? errorAlertId : undefined}
				noValidate
			>
				{error && (
					<Alert
						id={errorAlertId}
						variant="outlined"
						severity="error"
						icon={<XMark size="m" variant="outlined" />}
					>
						{getErrorMessage(error, 'Error while creating movie')}
					</Alert>
				)}
				<div className={styles['fields']}>
					<RHFTextField<FormSchema> name="title" label="Title" required fullWidth />
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
						required
						fullWidth
						multiple
					/>
					<div className={styles['number-fields']}>
						<RHFNumberField<FormSchema>
							name="ageLimit"
							label="Age limit"
							min={0}
							max={24}
							required
						/>
						<RHFNumberField<FormSchema>
							name="duration"
							label="Duration"
							startAdornment={'Min'}
							min={0}
							required
						/>
					</div>
					<RHFDatePicker<FormSchema>
						name="releaseDate"
						label="Release date"
						required
						fullWidth
					/>
					<RHFAutocomplete<FormSchema, Genre, boolean>
						name="genres"
						label="Genres"
						placeholder="Input genre name"
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
						multiple
						required
						fullWidth
					/>
					<RHFAutocomplete<FormSchema, Actor, boolean>
						name="actors"
						label="Actors"
						placeholder="Input actor name"
						inputValue={actorsInputValue}
						onChangeInputValue={handleChangeActorsInputValue}
						options={actorsQuery.data?.data || []}
						getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
						getOptionValue={(option) => String(option.id)}
						loading={actorsQuery.isLoading}
						renderValue={(option, onDelete) => (
							<Chip
								avatar={<Avatar src={option.photoUrl} />}
								color="secondary"
								key={option.id}
								label={`${getFirstLetter(option.firstName)}. ${option.lastName}`}
								tabIndex={-1}
								onClose={onDelete}
							/>
						)}
						renderOption={(option, props) => (
							<ActorOptionItem
								key={option.id}
								src={option.photoUrl}
								value={String(option.id)}
								firstName={option.firstName}
								lastName={option.lastName}
								{...props}
							/>
						)}
						required
						fullWidth
						multiple
						notFilter
					/>
					<RHFTextField<FormSchema>
						name="cardImgUrl"
						label="Card img url"
						required
						fullWidth
					/>
					<RHFTextField<FormSchema>
						name="videoUrl"
						label="Video url"
						required
						fullWidth
					/>
					<RHFTextArea<FormSchema>
						name="description"
						label="Description"
						className={styles['textarea']}
						required
						fullWidth
						rows={2}
					/>
				</div>
				<div className={styles['actions']}>
					{children}
					<div style={{ position: 'relative' }}>
						<Button
							disabled={!methods.formState.isValid || isPending}
							color="primary"
							type="submit"
						>
							Create movie
						</Button>
						{isPending && <CircularProgress absCenter />}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}
