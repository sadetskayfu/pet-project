import { useCallback, useState } from 'react'
import { SearchInput } from '@/shared/ui/SearchInput'
import { Button } from '@/shared/ui/Button'
import { useSearchParams } from 'react-router-dom'
import { MovieList } from '../MovieList/MovieList'
import { CreateMovieDialogContent } from '../MovieDialogs/CreateMovieDialogContent'
import { Dialog, DialogTrigger } from '@/shared/ui/Dialog'
import styles from './style.module.scss'

const MoviePanel = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const [searchValue, setSearchValue] = useState<string>(
		searchParams.get('search') || ''
	)

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchValue(value)
			setSearchParams({ search: value })
		},
		[setSearchParams]
	)

	return (
		<section className={styles['section']}>
			<Dialog>
				<div className={styles['actions']}>
					<SearchInput
						variant="outlined"
						label="Search movie by title"
						hiddenLabel
						fullWidth
						placeholder="Enter movie title"
						value={searchValue}
						onChange={handleSearchChange}
						defaultDirty={searchValue.length > 0}
					/>
					<DialogTrigger>
						<Button size="m">Add movie</Button>
					</DialogTrigger>
				</div>
				<MovieList searchValue={searchValue} />
				<CreateMovieDialogContent />
			</Dialog>
		</section>
	)
}

export default MoviePanel
