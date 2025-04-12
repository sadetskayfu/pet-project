import { lazy } from "react"
import ConfirmationDeleteDialog from "./ui/ConfirmationDeleteDialog"
export { ConfirmationDeleteDialog }
export const ConfirmationDeleteDialogLazy = lazy(
	() => import("./ui/ConfirmationDeleteDialog")
)
