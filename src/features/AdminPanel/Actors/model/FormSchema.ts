import { z } from 'zod'

export const formSchema = z.object({
	firstName: z
		.string()
		.min(1, { message: 'First name is required' })
		.max(32, { message: 'Max length 32 characters' }),
	lastName: z
		.string()
		.min(1, { message: 'First name is required' })
		.max(32, { message: 'Max length 32 characters' }),
	birthDate: z.string().min(1, { message: 'Birth date is required' }),
	photoUrl: z.string(),
})

export type FormSchema = z.infer<typeof formSchema>
