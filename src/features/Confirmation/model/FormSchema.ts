import { z } from "zod";

export const formSchema = z.object({
    code: z.array(z.string().min(1)).min(6).max(6)
})

export type FormSchema = z.infer<typeof formSchema>