import { FormProvider, useForm } from "react-hook-form"
import {
	loginByEmailFormSchema as formSchema,
	LoginByEmailFormSchema as FormSchema,
} from "../../model/LoginByEmailFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { RHFPasswordField, RHFTextField } from "@/shared/ui/RHFControllers"
import { Button } from "@/shared/ui/Button"
import { useLoginByEmail } from "../../services/useLoginByEmail"
import { Suspense, useId, useState } from "react"
import { LoginConfirmationDialog } from "@/features/Confirmation"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import styles from "./style.module.scss"

const LoginFormByEmail = () => {
	const [isMountedConfirmDialog, setIsMountedConfirmDialog] =
		useState<boolean>(false)
	const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState<boolean>(false)

	const errorAlertId = useId()

	const methods = useForm<FormSchema>({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const { login, isPending, error } = useLoginByEmail(() => {
		setIsOpenConfirmDialog(true)
		setIsMountedConfirmDialog(true)
	})

	return (
		<>
			<FormProvider {...methods}>
				<form
					className={styles["form"]}
					onSubmit={methods.handleSubmit((data) => login(data))}
					aria-describedby={error ? errorAlertId : undefined}
				>
					<ErrorAlert
						id={errorAlertId}
						error={error}
						message="Не удалось войти в аккаунт"
					/>
					<RHFTextField<FormSchema>
						name="email"
						label="Электронная почта"
						required
						trim
					/>
					<RHFPasswordField<FormSchema> name="password" label="Пароль" trim required />
					<div style={{position: 'relative'}}>
						<Button
							className={styles['submit-button']}
							type="submit"
							disabled={!methods.formState.isValid || isPending}
							color="primary"
						>
							Войти
						</Button>
						{isPending && <CircularProgress absCenter />}
					</div>
				</form>
			</FormProvider>
			{isMountedConfirmDialog && (
				<Suspense fallback={null}>
					<LoginConfirmationDialog
						open={isOpenConfirmDialog}
						setOpen={setIsOpenConfirmDialog}
						confirmationVariant="mail"
					/>
				</Suspense>
			)}
		</>
	)
}

export default LoginFormByEmail
