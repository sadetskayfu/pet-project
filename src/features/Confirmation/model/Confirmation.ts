export type ConfirmationVariant = 'mail' | 'phone'

export const confirmationVariant = {
    mail: 'mail',
    phone: 'phone'
}

export type SendAuthCodeBody = {
    userId: number
    confirmationVariant?: ConfirmationVariant
}

export type SendCodeResponse = {
    confirmationSessionid: number
    codeTimeValid: number
}

export type ConfirmationBody = {
    code: string
    confirmationSessionId: number
}
