import { CheckMark, Warning, XMark } from '@/shared/assets/icons'
import { Info } from '@/shared/assets/icons/ui/Info'
import { AlertSeverity } from '@/shared/ui/Alert'

export const getIcon = (severity: AlertSeverity) => {
	switch (severity) {
		case 'error':
			return <XMark variant="outlined" size="s" />
		case 'warning':
			return <Warning variant="outlined" size="s" />
		case 'success':
			return <CheckMark variant="outlined" size="s" />
		case 'info':
			return <Info variant="outlined" size="s" />
	}
}
