import { z } from "zod"

export const updateCommentFormSchema = z.object({
	message: z
		.string()
		.transform((value) => value.trim())
		.pipe(
			z
				.string()
				.min(1, { message: "Длина комментария должны быть не менее 1 символа" })
				.max(1000, {
					message: "Длина комментария не должна прешывать 1000 символов",
				})
		),
})

export type UpdateCommentFormSchema = z.infer<typeof updateCommentFormSchema>
