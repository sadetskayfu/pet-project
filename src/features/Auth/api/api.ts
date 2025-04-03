import { jsonApiInstance } from "@/shared/api"
import { AuthByEmailResponse, LoginBodyByEmail, RegisterBodyByEmail } from "../model/Auth"

export const authApi = {
	registerByEmail: (body: RegisterBodyByEmail) => {
		return jsonApiInstance<AuthByEmailResponse>('/auth/sign-up', {
			method: 'POST',
			json: body
		})
	},
	loginByEmail: (body: LoginBodyByEmail) => {
		return jsonApiInstance<AuthByEmailResponse>('/auth/sign-in', {
			method: 'POST',
			json: body
		})
	},
}
