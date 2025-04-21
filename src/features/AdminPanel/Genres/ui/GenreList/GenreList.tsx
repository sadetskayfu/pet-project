import { genreApi } from "@/entities/genres"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { useQuery } from "@tanstack/react-query"
import { useUpdateGenre } from "../../services/useUpdateGenre"
import { useDeleteGenre } from "../../services/useDeleteGenre"
import { patterns } from "@/shared/helpers/patterns"
import { Typography } from "@/shared/ui/Typography"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { CreateGenreField } from "../CreateGenreField/CreateGenreField"
import { GenreField } from "../GenreField/GenreCard"
import { useMemo } from "react"
import styles from "./style.module.scss"

const validateGenreName = (value: string) => {
	if (value.length < 2) {
		return "Минимальная длина название жанра - 2 символа"
	}
	if (value.length > 50) {
		return "Максимальная длина название жанра - 50 символов"
	}
	if (patterns.containSpecialCharacter.test(value)) {
		return "Название жанра не должено содержать специальных символов"
	}
	if (patterns.containDigits.test(value)) {
		return "Название жанра не должно содержать цифр"
	}

	return null
}

export const GenreList = () => {
	const {
		data: genres,
		isLoading,
		error,
	} = useQuery({ ...genreApi.getGenresQueryOptions() })

	const { updateGenre, getIsPending: getIsUpdatePending } = useUpdateGenre()
	const { deleteGenre, getIsPending: getIsDeletePending } = useDeleteGenre()

	const renderGenres = useMemo(() => {
		if (genres) {
			return genres.map((genre) => (
				<li key={genre.id}>
					<GenreField
						id={genre.id}
						name={genre.name}
						onValidate={validateGenreName}
						onDelete={deleteGenre}
						onUpdate={updateGenre}
						loading={getIsUpdatePending(genre.id) || getIsDeletePending(genre.id)}
					/>
				</li>
			))
		}
	}, [deleteGenre, updateGenre, genres, getIsDeletePending, getIsUpdatePending])

	return (
		<div className={styles["genre-list"]}>
			<CreateGenreField className={styles['create-genre-field']} onValidate={validateGenreName} />
			<ErrorAlert error={error} message="Не удалось получить жанры" />
			{isLoading ? (
				<CircularProgress size="l" aria-label="Получение жанров" absCenter />
			) : genres && genres.length > 0 ? (
				<ul className={styles["item-list"]}>{renderGenres}</ul>
			) : (
				<Typography component="p" color="soft" size="default">
					Не найдено ниодно жанра
				</Typography>
			)}
		</div>
	)
}
