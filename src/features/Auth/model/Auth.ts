export type RegisterBodyByEmail = {
	email: string
	password: string
	country: string
}

export type LoginBodyByEmail = {
	email: string
	password: string
}

export type AuthByEmailResponse = {
	userId: number
	email: string
}

export type AuthType =
	| 'register-by-email'
	| 'register-by-phone'
	| 'login-by-email'
	| 'login-by-phone'
