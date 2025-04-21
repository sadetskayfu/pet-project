import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { FormSchema, formSchema } from "../../model/FormSchema"
import { RHFDatePicker, RHFTextField } from "@/shared/ui/RHFControllers"
import { RHFToggleButtonGroup } from "@/shared/ui/RHFControllers/RHFToggleButtonGroup/RHFToggleButtonGroup"
import { GenderType } from "@/entities/profile"
import { useUpdateProfileUserInfo } from "../../services/useUpdateProfileUserInfo"
import { ReactElement, useCallback, useId } from "react"
import { Button } from "@/shared/ui/Button"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import styles from "./style.module.scss"

type GenderOption = {
	value: GenderType
	label: string
}

const genderOptions: GenderOption[] = [
	{
		value: "man",
		label: "Мущина",
	},
	{
		value: "woman",
		label: "Женщина",
	},
]

interface UpdateProfileUserInfoFormProps {
	defaultValues: FormSchema
	children: ReactElement
	onSuccess?: () => void
}

const UpdateProfileUserInfoForm = ({
	defaultValues,
	onSuccess,
	children,
}: UpdateProfileUserInfoFormProps) => {
	const errorAlertId = useId()

	const methods = useForm<FormSchema>({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	const { updateProfileUserInfo, error, isPending } =
		useUpdateProfileUserInfo(onSuccess)

	const handleUpdateProfile = useCallback(
		(data: FormSchema) => {
			updateProfileUserInfo({
				birthDate: data.birthDate || null,
				firstName: data.firstName || null,
				lastName: data.lastName || null,
				displayName: data.displayName || null,
				gender: (data.gender as GenderType) || null,
			})
		},
		[updateProfileUserInfo]
	)

	return (
		<FormProvider {...methods}>
			<form
				aria-describedby={error ? errorAlertId : undefined}
				className={styles["update-profile-form"]}
				onSubmit={methods.handleSubmit(handleUpdateProfile)}
				noValidate
			>
				<ErrorAlert
					id={errorAlertId}
					error={error}
					message="Не удалось изменить информацию"
				/>
				<div className={styles["fields"]}>
					<RHFTextField<FormSchema> name="firstName" label="Имя" />
					<RHFTextField<FormSchema> name="lastName" label="Фамилия" />
					<RHFTextField<FormSchema> name="displayName" label="Отображаемое имя" />
					<RHFDatePicker<FormSchema> name="birthDate" label="Дата рождения" />
				</div>
				<RHFToggleButtonGroup<FormSchema>
					className={styles["toggle-button-group"]}
					name="gender"
					options={genderOptions}
					optional
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

export default UpdateProfileUserInfoForm
