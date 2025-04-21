import { z } from 'zod'

export const formSchema = z.object({
	firstName: z
		.string()
		.min(1, { message: 'Имя обязательно' })
		.max(32, { message: 'Максимальная длина 32 символа' }),
	lastName: z
		.string()
		.min(1, { message: 'Фамилия обязательна' })
		.max(32, { message: 'Максимальная длина 32 символа' }),
	birthDate: z.string().min(1, { message: 'Дата рождения обязательна' }),
	photoUrl: z.string(),
})

export type FormSchema = z.infer<typeof formSchema>
