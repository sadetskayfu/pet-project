import { DialogClose, DialogContent, DialogHeading } from '@/shared/ui/Dialog'
import { Typography } from '@/shared/ui/Typography'
import { Button } from '@/shared/ui/Button'
import { CreateMovieForm } from '../MovieForms/CreateMovieForm'
import styles from './style.module.scss'

export const CreateMovieDialogContent = () => {
	return (
		<DialogContent
			containerClassName={styles['dialog']}
			className={styles['content']}
		>
			<DialogHeading>
				<Typography component="h3" size="h5" color="primary">
					Create movie
				</Typography>
			</DialogHeading>
			<CreateMovieForm>
				<DialogClose>
					<Button variant="clear">Cancel</Button>
				</DialogClose>
			</CreateMovieForm>
		</DialogContent>
	)
}
