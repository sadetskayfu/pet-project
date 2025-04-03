import { jsonApiInstance } from "@/shared/api"
import { ConfirmationBody, SendAuthCodeBody, SendCodeResponse } from "../model/Confirmation"

export const confirmationApi = {
    sendAuthCode: (body: SendAuthCodeBody) => {
        return jsonApiInstance<SendCodeResponse>('/confirmation/send-auth-code', {
            method: 'POST',
            json: body,
        })
    },
    registerConfirmation: (body: ConfirmationBody) => jsonApiInstance('/auth/sign-up/confirmation', {
        method: 'POST',
        json: body
    }),
    loginConfirmation: (body: ConfirmationBody) => jsonApiInstance('/auth/sign-in/confirmation', {
        method: 'POST',
        json: body
    }),
}