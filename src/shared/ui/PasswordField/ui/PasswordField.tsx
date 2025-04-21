import { forwardRef, memo, useState } from "react"
import { TextField, TextFieldProps } from "@/shared/ui/TextField"
import { IconButton } from "@/shared/ui/IconButton"
import { Eye } from "@/shared/assets/icons"
import { classNames, Mods } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

export const PasswordField = memo(
	forwardRef(
		(props: TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
			const { actions: externalActions = [], ...otherProps } = props

			const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)

			const mods: Mods = {
				[styles["hidden-password"]]: !isVisiblePassword,
			}

			const actions = [
				...externalActions,
				<IconButton
					className={classNames(
						styles["toggle-visibility-password-button"],
						[],
						mods
					)}
					onClick={() => setIsVisiblePassword((prev) => !prev)}
					stopPropagation
					variant="clear"
					aria-label={isVisiblePassword ? "Скрыть пароль" : "Показать пароль"}
				>
					<Eye />
				</IconButton>,
			]

			return (
				<TextField
					ref={ref}
					type={isVisiblePassword ? "text" : "password"}
					actions={actions}
					{...otherProps}
				/>
			)
		}
	)
)
