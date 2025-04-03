import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeading,
	DialogProps,
} from '@/shared/ui/Dialog'
import { Typography } from '@/shared/ui/Typography'
import { Button } from '@/shared/ui/Button'
import { FormSchema } from '../../model/FormSchema'
import { UpdateActorForm } from '../ActorForms/UpdateActorForm'
import styles from './style.module.scss'

type BaseDialogProps = Omit<DialogProps, 'children'>

interface UpdateActorDialogProps extends BaseDialogProps {
	actorId: number
	defaultFormValues: FormSchema
}

export const UpdateActorDialog = (props: UpdateActorDialogProps) => {
	const { setOpen, actorId, defaultFormValues, ...otherProps } = props

	return (
		<Dialog {...otherProps} setOpen={setOpen}>
			<DialogContent className={styles['dialog']}>
				<DialogHeading>
					<Typography component="h3" size="h5" color="primary">
						Update actor
					</Typography>
				</DialogHeading>
				<UpdateActorForm onCloseDialog={() => setOpen?.(false)} actorId={actorId} defaultValues={defaultFormValues}> 
					<DialogClose>
						<Button variant="clear">Cancel</Button>
					</DialogClose>
				</UpdateActorForm>
			</DialogContent>
		</Dialog>
	)
}
