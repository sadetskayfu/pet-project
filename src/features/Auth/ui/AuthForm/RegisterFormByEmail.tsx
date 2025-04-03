import { FormProvider, useForm } from 'react-hook-form'
import {
	registerByEmailFormSchema as formSchema,
	RegisterByEmailFormSchema as FormSchema,
} from '../../model/RegisterByEmailFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	RHFAutocompleteByValue,
	RHFTextField,
} from '@/shared/ui/RHFControllers'
import { getCountryOptions } from '@/entities/countries'
import { Suspense, useId, useMemo, useState } from 'react'
import { CountryOptionItem } from '@/shared/ui/OptionItem'
import { Button } from '@/shared/ui/Button'
import { useRegisterByEmail } from '../../services/useRegisterByEmail'
import { RegisterConfirmationDialog } from '@/features/Confirmation'
import { ErrorAlert } from '@/widgets/ErrorAlert'
import { PasswordHelperTooltip } from '@/widgets/PasswordHelperTooltip'
import styles from './style.module.scss'

const RegisterFormByEmail = () => {
	const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState<boolean>(false)
	const [isMountedConfirmDialog, setIsMountedConfirmDialog] =
		useState<boolean>(false)
	const [isOpenPasswordTooltip, setIsOpenPasswordTooltip] =
		useState<boolean>(false)

	const id = useId()
	const errorAlertId = id + 'error-alert'
	const passwordTooltipId = id + 'password-tooltip'

	const methods = useForm<FormSchema>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			country: '',
		},
	})

	const password = methods.watch('password')

	const countryOptions = useMemo(() => getCountryOptions(), [])

	const { register, isPending, error } = useRegisterByEmail(() => {
		setIsOpenConfirmDialog(true)
		setIsMountedConfirmDialog(true)
	})

	return (
		<>
			<FormProvider {...methods}>
				<form
					className={styles['form']}
					onSubmit={methods.handleSubmit((data) => register(data))}
					aria-describedby={error ? errorAlertId : undefined}
				>
					<ErrorAlert
						id={errorAlertId}
						error={error}
						message="Error while creating account. Try reload page"
					/>
					<RHFTextField<FormSchema> name="email" label="Email" required />
					<div style={{ position: 'relative' }}>
						<RHFTextField<FormSchema>
							name="password"
							label="Password"
							type="password"
							required
							helperTextIds={[passwordTooltipId]}
							onFocus={() => setIsOpenPasswordTooltip(true)}
							onBlur={() => setIsOpenPasswordTooltip(false)}
						/>
						<PasswordHelperTooltip
							value={password}
							id={passwordTooltipId}
							open={isOpenPasswordTooltip}
						/>
					</div>
					<RHFTextField<FormSchema>
						name="confirmPassword"
						label="Confirm password"
						type="password"
						required
					/>
					<RHFAutocompleteByValue<FormSchema>
						name="country"
						label="Country"
						required
						options={countryOptions}
						renderOption={(option, props) => (
							<CountryOptionItem
								key={option.value}
								value={option.value}
								label={option.label}
								showCode
								{...props}
							/>
						)}
					/>
					<Button
						type="submit"
						disabled={!methods.formState.isValid || isPending}
						color="primary"
					>
						Create account
					</Button>
				</form>
			</FormProvider>
			{isMountedConfirmDialog && (
				<Suspense fallback={null}>
					<RegisterConfirmationDialog
						open={isOpenConfirmDialog}
						setOpen={setIsOpenConfirmDialog}
						confirmationVariant="mail"
					/>
				</Suspense>
			)}
		</>
	)
}

export default RegisterFormByEmail
