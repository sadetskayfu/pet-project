import { patterns } from '@/shared/helpers/patterns'
import { z } from 'zod'

export const loginByEmailFormSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .max(64, { message: 'Email is too long. Max length is 64 characters' })
            .refine((value) => patterns.email.test(value), {
                message: 'Email is not valid',
            }),
        password: z
            .string()
            .min(1, { message: 'Password is required' })
            .min(6, { message: 'Password is too short. Min length is 6 characters' })
            .max(15, { message: 'Password is too long. Max length is 15 characters' })
            .refine((value) => patterns.containUppercase.test(value), {
                message: 'Password must contain at least one uppercase letter',
            })
            .refine((value) => !patterns.containSpecialCharacter.test(value), {
                message: 'Password must consist of only letters and numbers',
            }),
    })

export type LoginByEmailFormSchema = z.infer<
    typeof loginByEmailFormSchema
>
