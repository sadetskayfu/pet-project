import { useSelector } from 'react-redux'
import { ConfirmationVariant } from '../../../model/Confirmation'
import { useRegisterConfirmation } from '../../../services/useRegisterConfirmation'
import { BaseConfirmationDialog } from '../BaseConfirmationDialog/BaseConfirmationDialog'
import { authSelectors } from '@/features/Auth'
import { memo } from 'react'

interface RegisterConfirmationDialogProps {
	confirmationVariant: ConfirmationVariant
    open: boolean
    setOpen: (isOpen: boolean) => void
}

const RegisterConfirmationDialog = memo((
	props: RegisterConfirmationDialogProps
) => {
	const { confirmationVariant, open, setOpen } = props

    const userId = useSelector(authSelectors.getUserId)
	const userEmail = useSelector(authSelectors.getUserEmail)

	const { registerConfirmation, error, isPending } = useRegisterConfirmation()

	return (
		<BaseConfirmationDialog
            open={open}
            setOpen={setOpen}
			onConfirm={registerConfirmation}
			error={error}
			isPending={isPending}
			confirmationVariant={confirmationVariant}
			userId={userId || 0}
			email={userEmail || ''}
			title={`Подвтердите  ${confirmationVariant === 'phone' ? 'номер телефона' : 'электронную почту'} чтобы создать аккаунт`}
		/>
	)
})

export default RegisterConfirmationDialog
