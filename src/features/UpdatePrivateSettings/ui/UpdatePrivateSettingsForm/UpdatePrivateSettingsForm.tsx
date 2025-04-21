import { FormProvider, useForm } from "react-hook-form"
import { FormSchema, formSchema } from "../../model/FormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdatePrivateSettings } from "../../services/useUpdatePrivateSettings"
import { Button } from "@/shared/ui/Button"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { ReactElement, useId } from "react"
import { RHFSwitch } from "@/shared/ui/RHFControllers"
import styles from "./style.module.scss"

interface UpdatePrivateSettingsFormProps {
	defaultValues: FormSchema
	children: ReactElement
	onSuccess?: () => void
}

const UpdatePrivateSettingsForm = (props: UpdatePrivateSettingsFormProps) => {
	const { children, defaultValues, onSuccess } = props

	const errorAlertId = useId()

    console.log(defaultValues.isHiddenProfile)

	const methods = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	const { updatePrivateSettings, error, isPending } =
		useUpdatePrivateSettings(onSuccess)

	const handleUpdate = (data: FormSchema) => {
		updatePrivateSettings(data)
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(handleUpdate)}
				aria-describedby={error ? errorAlertId : undefined}
				className={styles["form"]}
			>
				<ErrorAlert
					id={errorAlertId}
					error={error}
					message="Не удалось изменить настройки приватности"
				/>
				<RHFSwitch<FormSchema>
					name="isHiddenProfile"
					className={styles["switch"]}
					label="Скрыть профиль"
					labelPlacement="left"
                    offset="right"
				/>
				<RHFSwitch<FormSchema>
					name="isHiddenWatchedMovies"
					className={styles["switch"]}
					label="Скрыть просмотренное медиа"
					labelPlacement="left"
                    offset="right"
				/>
				<RHFSwitch<FormSchema>
					name="isHiddenWishedMovies"
					className={styles["switch"]}
					label="Скрыть желаемое медиа"
					labelPlacement="left"
                    offset="right"
				/>
				<div className={styles["buttons"]}>
					{children}
					<div style={{ position: "relative" }}>
						<Button type="submit" disabled={isPending} color="primary">
							Сохранить изменения
						</Button>
						{isPending && (
							<CircularProgress absCenter aria-label="Сохранение изменений" />
						)}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}

export default UpdatePrivateSettingsForm
