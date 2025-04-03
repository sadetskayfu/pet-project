import { z } from 'zod'

export const formSchema = z.object({
	rating: z.number().min(0.5, { message: 'Rating is required' }),
	message: z.string().min(1, { message: 'Review is required' }).max(1000, {message: 'Max length 1000 characters'}),
})

export type FormSchema = z.infer<typeof formSchema>
