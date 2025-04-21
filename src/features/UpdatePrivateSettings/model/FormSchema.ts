import { z } from 'zod'

export const formSchema = z.object({
    isHiddenProfile: z.boolean(),
    isHiddenWatchedMovies: z.boolean(),
    isHiddenWishedMovies: z.boolean()
})

export type FormSchema = z.infer<typeof formSchema>