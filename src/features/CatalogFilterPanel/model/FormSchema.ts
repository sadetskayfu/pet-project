import { z } from 'zod'

export const formSchema = z.object({
	year: z.string(),
	rating: z.string(),
	countries: z.array(z.string()),
	genres: z.array(z.string()),
	sort: z.string(),
})

export type FormSchema = z.infer<typeof formSchema>
