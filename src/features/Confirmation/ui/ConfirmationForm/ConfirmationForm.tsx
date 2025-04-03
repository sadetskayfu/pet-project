import { FormProvider, useForm } from 'react-hook-form'
import { formSchema, FormSchema } from '../../model/FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui/Button'
import { ReactElement, useId } from 'react'
import { ConfirmationBody } from '../../model/Confirmation'
import { useSelector } from 'react-redux'
import { confirmationSelectors } from '../../slice/confirmationSlice'
import { RHFPinCodeField } from '@/shared/ui/RHFControllers'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { ErrorAlert } from '@/widgets/ErrorAlert'
import styles from './style.module.scss'

interface ConfirmationFormProps {
	children: ReactElement
	error?: Error | null
	isPending?: boolean
	disabled?: boolean
	onConfirm: (data: ConfirmationBody) => void
}

export const ConfirmationForm = (props: ConfirmationFormProps) => {
	const { children, error, isPending, disabled, onConfirm } = props

	const errorAlertId = useId()

	const sessionId = useSelector(confirmationSelectors.getSessionId)

	const methods = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: ['', '', '', '', '', ''],
		},
	})

	const handleConfirm = (data: FormSchema) => {
		const confirmationBody: ConfirmationBody = {
			code: data.code.join(''),
			confirmationSessionId: sessionId!,
		}

		onConfirm(confirmationBody)
	}

	return (
		<FormProvider {...methods}>
			<form
				className={styles['form']}
				onSubmit={methods.handleSubmit(handleConfirm)}
				aria-describedby={errorAlertId ? errorAlertId : undefined}
			>
				<RHFPinCodeField<FormSchema>
					name="code"
					label="Enter code"
					required
					hiddenLabel
				/>
				<ErrorAlert
					id={errorAlertId}
					error={error}
					message="Error while confirmation"
					fullWidth
				/>
				<div className={styles['actions']}>
					{children}
					<div style={{ position: 'relative' }}>
						<Button
							type='submit'
							color="primary"
							disabled={!methods.formState.isValid || isPending || disabled}
						>
							Confirm
						</Button>
						{isPending && <CircularProgress aria-label="Confirmation" absCenter />}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}
