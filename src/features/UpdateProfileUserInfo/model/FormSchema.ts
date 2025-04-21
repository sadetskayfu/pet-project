import { z } from 'zod'

export const formSchema = z.object({
    displayName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.string(),
    gender: z.string(),
})

export type FormSchema = z.infer<typeof formSchema>