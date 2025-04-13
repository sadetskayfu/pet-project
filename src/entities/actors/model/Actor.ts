import { z } from 'zod'

export const actorSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.string(),
    photoUrl: z.string().optional().nullable()
})

export type Actor = z.infer<typeof actorSchema>

export type CreateActorBody = {
    firstName: string
    lastName: string
    birthDate: string
    photoUrl: string
}

export interface ActorForMovie extends Actor  {
    role: string
}

export type ActorsResponse = {
    data: Actor[]
    nextCursor: number | null
}



