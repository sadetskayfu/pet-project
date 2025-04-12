import { format } from "date-fns"

export const getDateLabel = (date: string) => {
	return format(new Date(date), "dd.MM.yyyy")
}
