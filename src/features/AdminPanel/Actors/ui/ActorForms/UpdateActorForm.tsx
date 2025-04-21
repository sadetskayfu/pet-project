import { FormProvider, useForm } from "react-hook-form"
import { formSchema, FormSchema } from "../../model/FormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { RHFDatePicker, RHFTextField } from "@/shared/ui/RHFControllers"
import { Button } from "@/shared/ui/Button"
import { ReactElement, useId } from "react"
import { useUpdateActor } from "../../services/useUpdateActor"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import styles from "./style.module.scss"

interface UpdateActorFormProps {
	children: ReactElement
	actorId: number
	defaultValues: FormSchema
	onCloseDialog: () => void
}

const UpdateActorForm = (props: UpdateActorFormProps) => {
	const { children, actorId, defaultValues, onCloseDialog } = props

	const errorAlertId = useId()

	const methods = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		mode: "onBlur",
		reValidateMode: "onChange",
		defaultValues,
	})

	const { updateActor, isPending, error } = useUpdateActor(onCloseDialog)

	return (
		<FormProvider {...methods}>
			<form
				className={styles["form"]}
				onSubmit={methods.handleSubmit((data) =>
					updateActor({ id: actorId, body: data })
				)}
				aria-describedby={error ? errorAlertId : undefined}
			>
				<ErrorAlert
					id={errorAlertId}
					error={error}
					message="Не удалось обновить актера"
				/>
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
				<div className={styles["actions"]}>
					{children}
					<div style={{ position: "relative" }}>
						<Button
							disabled={!methods.formState.isValid || isPending}
							color="primary"
							type="submit"
						>
							Изменить актера
						</Button>
						{isPending && <CircularProgress aria-label="Изменение актера" absCenter />}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}

export default UpdateActorForm