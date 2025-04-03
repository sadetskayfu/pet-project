import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeading,
	DialogProps,
} from '@/shared/ui/Dialog'
import { Typography } from '@/shared/ui/Typography'
import { Button } from '@/shared/ui/Button'
import { useQuery } from '@tanstack/react-query'
import { movieApi } from '@/entities/movies'
import { Alert } from '@/shared/ui/Alert'
import { XMark } from '@/shared/assets/icons'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { UpdateMovieForm } from '../MovieForms/UpdateMovieForm'
import { SkeletonForm } from '../MovieForms/SkeletonForm'
import styles from './style.module.scss'

interface UpdateMovieDialogProps extends Omit<DialogProps, 'children'> {
	movieId: number
}

export const UpdateMovieDialog = (props: UpdateMovieDialogProps) => {
	const { movieId, open, setOpen, ...otherProps } = props

	const query = useQuery({
		...movieApi.getMovieByIdQueryOptions(movieId),
		enabled: open,
	})

	const { data: movie, error, isLoading } = query

	return (
		<Dialog open={open} setOpen={setOpen} {...otherProps}>
			<DialogContent
				containerClassName={styles['dialog']}
				className={styles['content']}
			>
				<DialogHeading>
					<Typography component="h3" size="h5" color="primary">
						Update movie
					</Typography>
				</DialogHeading>
				{error ? (
					<DialogDescription>
						<Alert
							variant="outlined"
							severity="error"
							icon={<XMark size="m" variant="outlined" />}
						>
							{getErrorMessage(error, 'Error while getting movie')}
						</Alert>
					</DialogDescription>
				) : isLoading ? (
					<SkeletonForm />
				) : (
					<UpdateMovieForm
						movieId={movieId}
						onCloseDialog={() => setOpen?.(false)}
						defaultValues={
							movie
								? {
										...movie,
										countries: movie.countries.map((country) => country.code),
										ageLimit: String(movie.ageLimit),
										duration: String(movie.duration),
									}
								: undefined
						}
					>
						<DialogClose>
							<Button variant="clear">Cancel</Button>
						</DialogClose>
					</UpdateMovieForm>
				)}
			</DialogContent>
		</Dialog>
	)
}
