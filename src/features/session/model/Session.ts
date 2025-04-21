type Role = {
    id: number
    name: string
}

export type SessionInfo = {
    id: number
    email: string
    roles: Role[]
    iat: number
    exp: number
}