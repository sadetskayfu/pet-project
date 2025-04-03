import { DialogClose, DialogContent, DialogHeading } from '@/shared/ui/Dialog'
import { Typography } from '@/shared/ui/Typography'
import { Button } from '@/shared/ui/Button'
import { CreateActorForm } from '../ActorForms/CreateActorForm'
import styles from './style.module.scss'

export const CreateActorDialogContent = () => {
	return (
		<DialogContent className={styles['dialog']}>
			<DialogHeading>
				<Typography component="h3" size="h5" color="primary">
					Create actor
				</Typography>
			</DialogHeading>
			<CreateActorForm>
				<DialogClose>
					<Button variant="clear">Cancel</Button>
				</DialogClose>
			</CreateActorForm>
		</DialogContent>
	)
}
