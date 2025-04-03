import { AlertSeverity } from '@/shared/ui/Alert'

export type CreateNotificationBody = {
	title?: string
	message: string
	severity: AlertSeverity
	timeToClose?: number
}

export interface Notification extends CreateNotificationBody {
	id: string
}
