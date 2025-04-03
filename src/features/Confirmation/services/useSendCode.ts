import { useMutation } from "@tanstack/react-query"
import { confirmationApi } from "../api/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { confirmationActions } from "../slice/confirmationSlice"

export const useSendCode = (onStartTimer: (startTime: number, endTime: number) => void) => {
    const dispatch = useAppDispatch()

    const { mutate, error, isPending } = useMutation({
        mutationFn: confirmationApi.sendAuthCode,
        onSuccess: (data) => {
            dispatch(confirmationActions.setSessionId(data.confirmationSessionid))
            onStartTimer(data.codeTimeValid / 1000, 0)
        }
    })

    return { sendCode: mutate, error, isPending }
}