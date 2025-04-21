import { useSendCode } from '../../../services/useSendCode'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeading,
	DialogProps,
} from '@/shared/ui/Dialog'
import { Typography } from '@/shared/ui/Typography'
import { useTimer } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { ConfirmationForm } from '../../ConfirmationForm/ConfirmationForm'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import {
	ConfirmationBody,
	ConfirmationVariant,
} from '../../../model/Confirmation'
import { ErrorAlert } from '@/widgets/ErrorAlert'
import { ReactNode, useCallback, useId, useState } from 'react'
import { Alert } from '@/shared/ui/Alert'
import { Warning } from '@/shared/assets/icons'
import styles from './style.module.scss'

interface BaseConfirmationDialogProps extends Omit<DialogProps, 'children'> {
	children?: ReactNode
	userId: number
	confirmationVariant: ConfirmationVariant
	title: string
	error?: Error | null
	isPending?: boolean
	email?: string
	phone?: number
	onConfirm: (data: ConfirmationBody) => void
}

export const BaseConfirmationDialog = (props: BaseConfirmationDialogProps) => {
	const {
		children,
		userId,
		confirmationVariant,
		title,
		error,
		isPending,
		email,
		phone,
		onConfirm,
		...otherProps
	} = props

	const [isExpired, setIsExpired] = useState<boolean>(false)

	const errorAlertId = useId()

	const handleSetExpired = useCallback(() => {
		setIsExpired(true)
	}, [])

	const handleClearExpired = useCallback(() => {
		setIsExpired(false)
	}, [])

	const { startTimer, time, isRunning } = useTimer({
		variant: 'decr',
		onEnd: handleSetExpired,
		onStart: handleClearExpired,
	})

	const {
		sendCode,
		error: sendCodeError,
		isPending: isSendCodePending,
	} = useSendCode(startTimer)

	const helperText =
		confirmationVariant === 'mail'
			? `Код был отправлен на элекнтрнную почту: ${email}.`
			: `Код был отправлен на номер телефона: ${phone}.`

	return (
		<Dialog {...otherProps}>
			<DialogContent
				containerClassName={styles['dialog']}
				className={styles['content']}
			>
				<DialogHeading>
					<Typography component="h3" size="h5" color="primary">
						{title}
					</Typography>
				</DialogHeading>
				{children}
				<ErrorAlert
					id={errorAlertId}
					error={sendCodeError}
					message="Не удалось отправить код"
					fullWidth
				/>
				<div className={styles['send-code-section']}>
					{isRunning ? (
						<Typography role="alert" component="p" size="helper">
							{helperText}<br/>
							Код устареет через {time}с.
						</Typography>
					) : (
						<div style={{ position: 'relative' }}>
							<Button
								size="xs"
								aria-description={sendCodeError ? errorAlertId : undefined}
								disabled={isSendCodePending}
								onClick={() => sendCode({ userId, confirmationVariant })}
							>
								Отправить код
							</Button>
							{isSendCodePending && (
								<CircularProgress aria-label="Sending code" absCenter />
							)}
						</div>
					)}
				</div>
				{isExpired && (
					<Alert fullWidth variant="outlined" icon={<Warning size="m" />} severity="warning">
						Код устарел, отправте код еще раз
					</Alert>
				)}
				<ConfirmationForm
					disabled={isExpired || !isRunning}
					error={error}
					isPending={isPending}
					onConfirm={onConfirm}
				>
					<DialogClose>
						<Button variant="clear">Отмена</Button>
					</DialogClose>
				</ConfirmationForm>
			</DialogContent>
		</Dialog>
	)
}
