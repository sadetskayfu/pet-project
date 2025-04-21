import { FormProvider, useForm } from 'react-hook-form'
import { formSchema, FormSchema } from '../../model/FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { RHFDatePicker, RHFTextField } from '@/shared/ui/RHFControllers'
import { Button } from '@/shared/ui/Button'
import { ReactElement, useId } from 'react'
import { useCreateActor } from '../../services/useCreateActor'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { ErrorAlert } from '@/widgets/ErrorAlert'
import styles from './style.module.scss'

interface CreateActorFormProps {
	children: ReactElement
}

const CreateActorForm = (props: CreateActorFormProps) => {
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
				<ErrorAlert id={errorAlertId} error={error} message='Не удалось создать актера'/>
				<RHFTextField<FormSchema>
					name="firstName"
					label="Имя"
					required
					size="m"
				/>
				<RHFTextField<FormSchema>
					name="lastName"
					label="Фамилия"
					required
					size="m"
				/>
				<RHFDatePicker<FormSchema>
					name="birthDate"
					label="Дата рождения"
					required
					size="m"
				/>
				<RHFTextField<FormSchema> name="photoUrl" label="Урл фотографии" size="m" />
				<div className={styles['actions']}>
					{children}
					<div style={{ position: 'relative' }}>
						<Button
							disabled={!methods.formState.isValid || isPending}
							color="primary"
							type="submit"
						>
							Создать актера
						</Button>
						{isPending && <CircularProgress aria-label='Идет создание актера' absCenter />}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}

export default CreateActorForm