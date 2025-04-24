import { useSelector } from 'react-redux'
import { ConfirmationVariant } from '../../../model/Confirmation'
import { useLoginConfirmation } from '../../../services/useLoginConfirmation'
import { BaseConfirmationDialog } from '../BaseConfirmationDialog/BaseConfirmationDialog'
import { authSelectors } from '@/features/Auth'
import { memo } from 'react'

interface LoginConfirmationDialogProps {
	confirmationVariant: ConfirmationVariant
	open: boolean
	setOpen: (isOpen: boolean) => void
}

const LoginConfirmationDialog = memo((
	props: LoginConfirmationDialogProps
) => {
	const { confirmationVariant, open, setOpen } = props

    const userId = useSelector(authSelectors.getUserId)
	const userEmail = useSelector(authSelectors.getUserEmail)

	const { loginConfirmation, error, isPending } = useLoginConfirmation()

	return (
		<BaseConfirmationDialog
			open={open}
			setOpen={setOpen}
			onConfirm={loginConfirmation}
			error={error}
			isPending={isPending}
			confirmationVariant={confirmationVariant}
			userId={userId || 0}
			email={userEmail || ''}
			title={`Подвтердите что это вы`}
		/>
	)
})

export default LoginConfirmationDialog
