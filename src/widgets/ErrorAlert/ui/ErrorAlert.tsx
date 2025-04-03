import { XMark } from '@/shared/assets/icons'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { Alert } from '@/shared/ui/Alert'

interface ErrorAlertProps {
    className?: string
    id?: string
	error?: Error | null
    fullWidth?: boolean
	message: string
}

export const ErrorAlert = (props: ErrorAlertProps) => {
	const { className, id, error, fullWidth, message } = props

	if (error) {
		return (
			<Alert
                id={id}
                className={className}
				icon={<XMark size="m" variant="outlined" />}
				variant="outlined"
				severity="error"
                fullWidth={fullWidth}
			>
				{getErrorMessage(error, message)}
			</Alert>
		)
	}

    return null
}
