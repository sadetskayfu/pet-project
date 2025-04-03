import { memo, useState } from 'react'
import { TextField, TextFieldProps } from '../../TextField'
import { IconButton } from '../../IconButton'
import { Eye } from '@/shared/assets/icons'
import { classNames, Mods } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export const PasswordField = memo((props: TextFieldProps) => {
	const { actions: externalActions = [], ...otherProps } = props

	const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)

	const mods: Mods = {
		[styles['hidden-password']]: !isVisiblePassword,
	}

	const actions = [
		...externalActions,
		<IconButton
			className={classNames(styles['toggle-visibility-password-button'], [], mods)}
			onClick={() => setIsVisiblePassword((prev) => !prev)}
            stopPropagation
			variant="clear"
			aria-label={isVisiblePassword ? 'Hide password' : 'Show password'}
		>
			<Eye />
		</IconButton>,
	]

	return (
		<TextField
			type={isVisiblePassword ? 'text' : 'password'}
			actions={actions}
			{...otherProps}
		/>
	)
})
