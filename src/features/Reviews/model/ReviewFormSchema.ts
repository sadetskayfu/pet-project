import { z } from "zod"

export const reviewFormSchema = z.object({
	rating: z.number().min(0.5, { message: "Рейтинг обязателен" }),
	message: z
		.string()
		.transform((value) => value.trim())
		.pipe(
			z
				.string()
				.min(1, { message: "Длина отзыва должны быть не менее 1 символа" })
				.max(1000, {
					message: "Длина отзыва не должна прешывать 1000 символов",
				})
		),
})

export type ReviewFormSchema = z.infer<typeof reviewFormSchema>
