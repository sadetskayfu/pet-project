import { genreApi } from '@/entities/genres'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { Alert } from '@/shared/ui/Alert'
import { XMark } from '@/shared/assets/icons'
import { useQuery } from '@tanstack/react-query'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { useCreateGenre } from '../../model/useCreateGenre'
import { CreateTagField } from '@/shared/ui/TagField'
import { useUpdateGenre } from '../../model/useUpdateGenre'
import { useDeleteGenre } from '../../model/useDeleteGenre'
import { patterns } from '@/shared/helpers/patterns'
import { GenreCard } from '../GenreCard/GenreCard'
import styles from './style.module.scss'
import { Typography } from '@/shared/ui/Typography'
import { useCallback } from 'react'

export const GenreList = () => {
	const query = useQuery({ ...genreApi.getGenresQueryOptions() })

	const { data, isLoading, error } = query

	const { handleCreate, createLoading } = useCreateGenre()
	const { handleUpdate, updateLoading } = useUpdateGenre()
	const { handleDelete, deleteLoading } = useDeleteGenre()

	const handleValidate = useCallback((value: string) => {
		if (value.length < 2) {
			return 'The genre name must consist of at least 2 characters.'
		}
		if (value.length > 50) {
			return 'The genre name should not exceed 50 characters in length.'
		}
		if (patterns.containSpecialCharacter.test(value)) {
			return 'The genre name must not contain any special characters'
		}
		if (patterns.containDigits.test(value)) {
			return 'The genre name must not contain digits'
		}
	}, [])

	if (isLoading) {
		return <CircularProgress absCenter />
	}

	if (error) {
		return (
			<Alert
				variant="outlined"
				severity="error"
				icon={<XMark size="m" variant="outlined" />}
			>
				{getErrorMessage(error, 'Error while getting genres. Try reload page')}
			</Alert>
		)
	}

	const isMutationLoading = updateLoading || deleteLoading || createLoading

	const mods: Mods = {
		[styles['loading']]: isMutationLoading,
	}

	return (
		<>
			<section className={classNames(styles['section'], [], mods)}>
				<CreateTagField
					readonly={isMutationLoading}
					onCreate={handleCreate}
					onValidate={handleValidate}
					label="Genre name"
					placeholder="Enter genre name"
					maxInputWidth={300}
				/>
				{data!.length > 0 ? (
					<ul className={styles['item-list']}>
						{data!.map((genre) => {
							return (
								<li key={genre.id}>
									<GenreCard
										readonly={isMutationLoading}
										label="Genre name"
										placeholder="Enter genre name"
										id={genre.id}
										onValidate={handleValidate}
										onUpdate={handleUpdate}
										onDelete={handleDelete}
										defaultValue={genre.name}
										maxInputWidth={300}
									/>
								</li>
							)
						})}
					</ul>
				) : (
					<Typography component='p' color="soft" size="default">
						There is not a single genre yet. Create your first genre
					</Typography>
				)}
			</section>
		</>
	)
}
