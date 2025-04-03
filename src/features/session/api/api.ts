import { jsonApiInstance } from "@/shared/api"
import { SessionInfo } from "../model/Session"

export const sessionApi = {
    getSessionInfo: async () => jsonApiInstance<SessionInfo>('/auth/session'),
    logout: async () => jsonApiInstance('/auth/sign-out')
}