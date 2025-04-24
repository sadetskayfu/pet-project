import { useCallback } from "react"
import { useSelector } from "react-redux"
import { userSelectors } from "@/entities/user"
import { useAppDispatch } from "../redux/redux"
import { authActions } from "@/features/Auth"

export const usePrivateHandler = <T extends (...args: any[]) => any>(
	callback: T
) => {
	const dispatch = useAppDispatch()

	const user = useSelector(userSelectors.getUser)

	const handler = useCallback(
		(...args: Parameters<T>) => {
			if (user) {
				callback(...args)
			} else {
				dispatch(authActions.setOpenConfirmRedirectDialog(true))
			}
		},
		[callback, dispatch, user]
	)

    return handler
}
