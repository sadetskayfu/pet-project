import { patterns } from '@/shared/helpers/patterns'
import { z } from 'zod'

export const loginByEmailFormSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: 'Электронная почта обязательна' })
            .max(64, { message: 'Максимальная длина 64 символа' })
            .refine((value) => patterns.email.test(value), {
                message: 'Электронная почта не валидна',
            }),
        password: z
            .string()
            .min(1, { message: 'Пароль обязательный' })
            .min(6, { message: 'Пароль слишком короткий. Минимальная длина 6 символов' })
            .max(15, { message: 'Пароль слишком длинный. Максимальная длина 15 символов' })
            .refine((value) => patterns.containUppercase.test(value), {
                message: 'Пароль должен содержать хотябы 1 заглавную букуву',
            })
            .refine((value) => !patterns.containSpecialCharacter.test(value), {
                message: 'Пароль не должен содержать специальных символов',
            }),
    })

export type LoginByEmailFormSchema = z.infer<
    typeof loginByEmailFormSchema
>
