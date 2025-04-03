import { lazy } from 'react'

export const RegisterConfirmationDialog = lazy(
	() =>
		import(
			'./ui/ConfirmationDialogs/RegisterConfirmationDialog/RegisterConfirmationDialog'
		)
)

export const LoginConfirmationDialog = lazy(
	() =>
		import(
			'./ui/ConfirmationDialogs/LoginConfirmationDialog/LoginConfirmationDialog'
		)
)
