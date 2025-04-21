export type ActorRole = "actor" | "director" | "writer"

export type Actor = {
    id: number
    firstName: string
    lastName: string
    birthDate: string
    photoUrl: string
}

export type CreateActorBody = {
    firstName: string
    lastName: string
    birthDate: string
    photoUrl: string
}

export interface ActorForMovie extends Actor  {
    role: ActorRole
}

export type ActorsResponse = {
    data: Actor[]
    nextCursor: number | null
}



