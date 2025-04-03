import { FormProvider, useForm } from 'react-hook-form'
import { formSchema, FormSchema } from '../../model/FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { RHFDatePicker, RHFTextField } from '@/shared/ui/RHFControllers'
import { Button } from '@/shared/ui/Button'
import { ReactElement, useId } from 'react'
import { useCreateActor } from '../../model/useCreateActor'
import { Alert } from '@/shared/ui/Alert'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { XMark } from '@/shared/assets/icons'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import styles from './style.module.scss'

interface CreateActorFormProps {
	children: ReactElement
}

export const CreateActorForm = (props: CreateActorFormProps) => {
	const { children } = props

	const errorAlertId = useId()

	const methods = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: {
			firstName: '',
			lastName: '',
			birthDate: '',
			photoUrl: '',
		},
	})

	const { createActor, isPending, error } = useCreateActor(methods.reset)

	const handleCreate = (formData: FormSchema) => {
		createActor(formData)
	}

	return (
		<FormProvider {...methods}>
			<form
				className={styles['form']}
				onSubmit={methods.handleSubmit(handleCreate)}
				aria-describedby={error ? errorAlertId : undefined}
			>
				{error && (
					<Alert
						id={errorAlertId}
						variant="outlined"
						severity="error"
						icon={<XMark size="m" variant="outlined" />}
					>
						{getErrorMessage(error, 'Error while creating actor')}
					</Alert>
				)}
				<RHFTextField<FormSchema>
					name="firstName"
					label="First name"
					required
					size="m"
				/>
				<RHFTextField<FormSchema>
					name="lastName"
					label="Last name"
					required
					size="m"
				/>
				<RHFDatePicker<FormSchema>
					name="birthDate"
					label="Birth date"
					required
					size="m"
				/>
				<RHFTextField<FormSchema> name="photoUrl" label="Photo url" size="m" />
				<div className={styles['actions']}>
					{children}
					<div style={{ position: 'relative' }}>
						<Button
							disabled={!methods.formState.isValid || isPending}
							color="primary"
							type="submit"
						>
							Create actor
						</Button>
						{isPending && <CircularProgress absCenter />}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}
